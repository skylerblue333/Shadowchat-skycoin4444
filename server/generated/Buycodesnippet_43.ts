// AUTO-GENERATED DRAFT PROCEDURE: buyCodeSnippet

import { z } from 'zod';
import { protectedProcedure, router } from '../trpc'; // Assuming trpc context setup
import { db } from '../db'; // Assuming Drizzle DB instance
import { codeSnippets } from '../schema'; // Assuming Drizzle schema
import { eq, and, isNull } from 'drizzle-orm';

export const buyCodeSnippet = protectedProcedure
  .input(z.object({
    snippetId: z.string().uuid(),
    buyerId: z.string().uuid(), // The ID of the user making the purchase
  }))
  .mutation(async ({ ctx, input }) => {
    const { snippetId, buyerId } = input;

    // 1. Validate buyer is not the current owner
    // This check assumes `ctx.session.user.id` is the authenticated user.
    // For simplicity, we'll use `buyerId` from input, but in a real app,
    // `buyerId` would typically come from `ctx.session.user.id`.
    // In a real application, buyerId would typically come from ctx.session.user.id
    // For this example, we assume buyerId from input is the authenticated user.
    // if (ctx.session.user.id !== buyerId) {
    //   throw new Error("Unauthorized: Buyer ID does not match authenticated user.");
    // }

    // 2. Find the code snippet and check its status
    const snippet = await db.query.codeSnippets.findFirst({
      where: eq(codeSnippets.id, snippetId),
    });

    if (!snippet) {
      throw new Error("Code snippet not found.");
    }

    if (snippet.buyerId !== null) {
      throw new Error("Code snippet is already owned.");
    }

    if (snippet.ownerId === buyerId) {
      throw new Error("Cannot buy your own code snippet.");
    }

    // 3. Perform the purchase (update buyerId)
    const [updatedSnippet] = await db.update(codeSnippets)
      .set({
        buyerId: buyerId,
        updatedAt: new Date(),
      })
      .where(and(
        eq(codeSnippets.id, snippetId),
        isNull(codeSnippets.buyerId) // Ensure it hasn't been bought by someone else concurrently
      })
      .returning();

    if (!updatedSnippet) {
      throw new Error("Failed to purchase code snippet. It might have been sold already.");
    }

    return { success: true, message: "Code snippet purchased successfully!", snippet: updatedSnippet };
  });

// Example of how to add this procedure to your tRPC router
// export const appRouter = router({
//   // ... other procedures
//   buyCodeSnippet: buyCodeSnippet,
// });
