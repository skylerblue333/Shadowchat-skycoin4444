import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const miningRouter = router({
  getMiningStats: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return { hashrate: 0, totalMined: 0, efficiency: 0 };
    }),
});
