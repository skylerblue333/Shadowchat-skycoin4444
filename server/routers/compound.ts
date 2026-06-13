import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const compoundRouter = router({
  getDashboardData: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return { totalSupply: 0, totalBorrow: 0, rate: 0 };
    }),
});
