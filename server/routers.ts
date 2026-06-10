import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { engineerRouter } from "./routers/engineer";
import { schoolRouter } from "./routers/school";
import { gamingRouter } from "./routers/gaming";
import { governanceRouter } from "./routers/governance";
import { charityRouter } from "./routers/charity";
import { marketplaceRouter } from "./routers/marketplace";
import { analyticsRouter } from "./routers/analytics";
import { tradingRouter } from "./routers/trading";
import { escrowRouter } from "./routers/escrow";
import { videoRouter } from "./routers/video";
import { socialRouter } from "./routers/social";
import { agentsRouter } from "./routers/agents";
import { beginnerRouter } from "./routers/beginner";
import { uploadsRouter } from "./routers/uploads";
import { seedRouter } from "./routers/seed";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    // Called by the client right after first authenticated load. Fires the
    // owner "new user signup" alert exactly once per newly created account.
    onboard: publicProcedure.mutation(async ({ ctx }) => {
      if (!ctx.user) return { isNew: false };
      const createdAt = ctx.user.createdAt ? new Date(ctx.user.createdAt).getTime() : 0;
      const isNew = Date.now() - createdAt < 60_000; // created within the last minute
      if (isNew) {
        await notifyOwner({
          title: "New user signup",
          content: `${ctx.user.name ?? ctx.user.openId} just joined SKYCOIN4444.`,
        }).catch(() => {});
      }
      return { isNew };
    }),
  }),
  engineer: engineerRouter,
  school: schoolRouter,
  gaming: gamingRouter,
  governance: governanceRouter,
  charity: charityRouter,
  marketplace: marketplaceRouter,
  analytics: analyticsRouter,
  trading: tradingRouter,
  escrow: escrowRouter,
  video: videoRouter,
  social: socialRouter,
  agents: agentsRouter,
  beginner: beginnerRouter,
  uploads: uploadsRouter,
  seed: seedRouter,
});

export type AppRouter = typeof appRouter;
