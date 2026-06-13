import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const rwaRouter = router({
  getDashboardData: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return { assets: [], totalValue: 0 };
    }),
});
