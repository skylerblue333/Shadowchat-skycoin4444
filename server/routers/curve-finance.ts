import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const curveFinanceRouter = router({
  query: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return { pools: [], tvl: 0 };
    }),
});
