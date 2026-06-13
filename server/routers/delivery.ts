import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const deliveryRouter = router({
  getStatus: publicProcedure
    .input(z.object({ orderId: z.string() }).optional())
    .query(async ({ input }) => {
      return { status: "pending", orderId: input?.orderId || "" };
    }),
});
