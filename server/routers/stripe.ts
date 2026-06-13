import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy");

export const stripeRouter = router({
  // Create checkout session
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            priceId: z.string(),
            quantity: z.number().default(1),
          })
        ),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
        customerEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: input.items.map(item => ({
            price: item.priceId,
            quantity: item.quantity,
          })),
          mode: "payment",
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          customer_email: input.customerEmail || ctx.user?.email || undefined,
          client_reference_id: `user_${ctx.user.id}`,
        });
        return {
          success: true,
          sessionId: session.id,
          url: session.url || "",
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create checkout session",
        };
      }
    }),

  // Create subscription
  createSubscription: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
        paymentMethodId: z.string(),
        billingCycleAnchor: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get or create customer
        let customerId: string;
        const customers = await stripe.customers.list({
          email: ctx.user?.email ? ctx.user.email : undefined,
          limit: 1,
        });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        } else {
        const customer = await stripe.customers.create({
          email: ctx.user?.email ? ctx.user.email : undefined,
          metadata: { userId: ctx.user.id.toString() },
        });
          customerId = customer.id;
        }

        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: input.priceId }],
          default_payment_method: input.paymentMethodId,
          billing_cycle_anchor: input.billingCycleAnchor,
        });

        return {
          success: true,
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: (subscription as any).current_period_end || 0,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create subscription",
        };
      }
    }),

  // Get subscription
  getSubscription: protectedProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const subscription = await stripe.subscriptions.retrieve(input.subscriptionId);
        return {
          id: subscription.id,
          status: subscription.status,
          currentPeriodStart: (subscription as any).current_period_start || 0,
          currentPeriodEnd: (subscription as any).current_period_end || 0,
          cancelAtPeriodEnd: (subscription as any).cancel_at_period_end || false,
          items: subscription.items.data.map(item => ({
            id: item.id,
            priceId: (item.price as any).id || "",
            quantity: item.quantity || 1,
          })),
        };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to get subscription",
        };
      }
    }),

  // Update subscription
  updateSubscription: protectedProcedure
    .input(
      z.object({
        subscriptionId: z.string(),
        priceId: z.string().optional(),
        quantity: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const subscription = await stripe.subscriptions.retrieve(input.subscriptionId);
        const itemId = subscription.items.data[0].id;

        const updated = await stripe.subscriptions.update(input.subscriptionId, {
          items: [
            {
              id: itemId,
              price: input.priceId,
              quantity: input.quantity,
            },
          ],
        });

        return {
          success: true,
          subscriptionId: updated.id,
          status: updated.status,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to update subscription",
        };
      }
    }),

  // Cancel subscription
  cancelSubscription: protectedProcedure
    .input(
      z.object({
        subscriptionId: z.string(),
        atPeriodEnd: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await stripe.subscriptions.update(input.subscriptionId, {
          cancel_at_period_end: input.atPeriodEnd,
        });

        return {
          success: true,
          subscriptionId: updated.id,
          canceledAt: (updated as any).canceled_at,
          cancelAtPeriodEnd: (updated as any).cancel_at_period_end,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to cancel subscription",
        };
      }
    }),

  // Create invoice
  createInvoice: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        description: z.string().optional(),
        items: z
          .array(
            z.object({
              description: z.string(),
              amount: z.number(),
              quantity: z.number().default(1),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const invoice = await stripe.invoices.create({
          customer: input.customerId,
          description: input.description,
        });

        if (input.items) {
          for (const item of input.items) {
            await stripe.invoiceItems.create({
              invoice: invoice.id,
              customer: input.customerId,
              description: item.description,
              amount: Math.round(item.amount * 100),
              quantity: item.quantity,
            });
          }
        }

        return {
          success: true,
          invoiceId: invoice.id,
          status: invoice.status,
          amountDue: (invoice as any).amount_due || 0,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create invoice",
        };
      }
    }),

  // Get invoice
  getInvoice: protectedProcedure
    .input(z.object({ invoiceId: z.string() }))
    .query(async ({ input }) => {
      try {
        const invoice = await stripe.invoices.retrieve(input.invoiceId);
        return {
          id: invoice.id,
          status: invoice.status,
          amountDue: (invoice as any).amount_due || 0,
          amountPaid: (invoice as any).amount_paid || 0,
          total: (invoice as any).total || 0,
          dueDate: (invoice as any).due_date,
          pdfUrl: (invoice as any).pdf || "",
          lines: invoice.lines.data.map(line => ({
            id: line.id,
            description: line.description || "",
            amount: (line as any).amount || 0,
            quantity: (line as any).quantity || 1,
          })),
        };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to get invoice",
        };
      }
    }),

  // List invoices
  listInvoices: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const invoices = await stripe.invoices.list({
          customer: input.customerId,
          limit: input.limit,
        });
        return {
          invoices: invoices.data.map(inv => ({
            id: inv.id,
            status: inv.status,
            total: (inv as any).total || 0,
            dueDate: (inv as any).due_date,
            created: inv.created,
          })),
          total: invoices.data.length,
        };
      } catch (error) {
        return {
          invoices: [],
          error: error instanceof Error ? error.message : "Failed to list invoices",
        };
      }
    }),

  // Refund payment
  refundPayment: protectedProcedure
    .input(
      z.object({
        chargeId: z.string(),
        amount: z.number().optional(),
        reason: z.enum(["duplicate", "fraudulent", "requested_by_customer"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const refund = await stripe.refunds.create({
          charge: input.chargeId,
          amount: input.amount ? Math.round(input.amount * 100) : undefined,
          reason: input.reason,
        });

        return {
          success: true,
          refundId: refund.id,
          status: refund.status,
          amount: (refund.amount || 0) / 100,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to refund payment",
        };
      }
    }),

  // Get refund
  getRefund: protectedProcedure
    .input(z.object({ refundId: z.string() }))
    .query(async ({ input }) => {
      try {
        const refund = await stripe.refunds.retrieve(input.refundId);
        return {
          id: refund.id,
          status: refund.status,
          amount: (refund.amount || 0) / 100,
          chargeId: (refund.charge as string) || "",
          reason: (refund.reason as string) || "",
          createdAt: refund.created,
        };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to get refund",
        };
      }
    }),

  // Retry invoice payment
  retryInvoicePayment: protectedProcedure
    .input(z.object({ invoiceId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const invoice = await stripe.invoices.pay(input.invoiceId);
        return {
          success: true,
          invoiceId: invoice.id,
          status: invoice.status,
          amountPaid: (invoice as any).amount_paid || 0,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to retry invoice payment",
        };
      }
    }),

  // Create payment intent
  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        currency: z.string().default("usd"),
        description: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const intent = await stripe.paymentIntents.create({
          amount: Math.round(input.amount * 100),
          currency: input.currency,
          description: input.description,
          metadata: {
            userId: ctx.user.id.toString(),
            ...input.metadata,
          },
        });

        return {
          success: true,
          clientSecret: intent.client_secret || "",
          intentId: intent.id,
          status: intent.status,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to create payment intent",
        };
      }
    }),

  // Verify webhook signature
  verifyWebhookSignature: publicProcedure
    .input(
      z.object({
        body: z.string(),
        signature: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const event = stripe.webhooks.constructEvent(
          input.body,
          input.signature,
          process.env.STRIPE_WEBHOOK_SECRET || "whsec_test"
        );
        return {
          valid: true,
          eventType: event.type,
          eventId: event.id,
        };
      } catch {
        return {
          valid: false,
          error: "Invalid webhook signature",
        };
      }
    }),

  // Get payment methods
  getPaymentMethods: protectedProcedure
    .input(z.object({ customerId: z.string() }))
    .query(async ({ input }) => {
      try {
        const methods = await stripe.paymentMethods.list({
          customer: input.customerId,
          type: "card",
        });

        return {
          paymentMethods: methods.data.map(method => ({
            id: method.id,
            type: method.type,
            card: method.card
              ? {
                  brand: method.card.brand || "",
                  last4: method.card.last4 || "",
                  expMonth: method.card.exp_month || 0,
                  expYear: method.card.exp_year || 0,
                }
              : null,
          })),
          total: methods.data.length,
        };
      } catch (error) {
        return {
          paymentMethods: [],
          error: error instanceof Error ? error.message : "Failed to get payment methods",
        };
      }
    }),
});
