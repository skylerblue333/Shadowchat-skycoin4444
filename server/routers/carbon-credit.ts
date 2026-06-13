import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const carbonCreditRouter = router({
  getPortfolio: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return { credits: 0, value: 0 };
    }),
});
