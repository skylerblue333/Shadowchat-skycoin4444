import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

export const autocallRouter = router({
  getProducts: publicProcedure
    .input(z.object({}).optional())
    .query(async () => {
      return [];
    }),
});
