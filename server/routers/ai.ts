import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const aiRouter = router({
  chat: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      return {
        success: true,
        response: "AI chat response",
        message: input.message,
      };
    }),
  getOutputs: publicProcedure
    .input(z.array(z.string()).optional())
    .query(async ({ input }) => {
      return [];
    }),
});
