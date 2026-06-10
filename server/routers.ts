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
import { marketplaceAdvancedRouter as nftMarketplaceRouter } from "./routers/marketplace-advanced";
import { phase21RealtimeRouter } from "./routers/phase21-realtime";
import { phase22AiMlRouter } from "./routers/phase22-ai-ml";
import { phase23AdminDashboardRouter } from "./routers/phase23-admin-dashboard";
import { phase24AnalyticsRouter } from "./routers/phase24-analytics";
import { phase25NotificationsRouter } from "./routers/phase25-notifications";
import { phase26MobileRouter } from "./routers/phase26-mobile";
import { phase27SecurityRouter } from "./routers/phase27-security";
import { phase28PerformanceRouter } from "./routers/phase28-performance";
import { phase29UiRouter } from "./routers/phase29-ui";
import { phase30GatewayRouter } from "./routers/phase30-gateway";
import { analyticsRouter } from "./routers/analytics";
import { tradingRouter } from "./routers/trading";
import { escrowRouter } from "./routers/escrow";
import { videoRouter } from "./routers/video";
import { socialRouter } from "./routers/social";
import { agentsRouter } from "./routers/agents";
import { beginnerRouter } from "./routers/beginner";
import { hopeaiAdvancedRouter } from "./routers/hopeai-advanced";
import { featuresExpansionRouter } from "./routers/features-expansion";
import { megaFeaturesRouter } from "./routers/mega-features";
import { rulesEngineRouter } from "./routers/rules-engine";
import { integrationsRouter } from "./routers/integrations";
import { marketplaceAdvancedRouter } from "./routers/marketplace-advanced";
import { uploadsRouter } from "./routers/uploads";
import { seedRouter } from "./routers/seed";

import { freeTierRouter } from "./routers/free-tier";
import { notificationsRouter } from "./routers/notifications";
import { codeQualityRouter } from "./routers/code-quality";
import { advancedSearchRouter } from "./routers/advanced-search";
import { cryptoRouter } from "./routers/crypto";
import { leaderboardsRouter } from "./routers/leaderboards";
import { achievementsRouter } from "./routers/achievements";
import { referralsRouter } from "./routers/referrals";
import { tradingBotsRouter } from "./routers/trading-bots";
import { walletRouter } from "./routers/wallet";
import { gamificationRouter } from "./routers/gamification";
import { earnLearnRouter } from "./routers/earn-learn";
import { aiCodeEngineerRouter } from "./routers/ai-code-engineer";

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
  marketplace: nftMarketplaceRouter,
  analytics: analyticsRouter,
  trading: tradingRouter,
  escrow: escrowRouter,
  video: videoRouter,
  social: socialRouter,
  agents: agentsRouter,
  beginner: beginnerRouter,
  hopeaiAdvanced: hopeaiAdvancedRouter,
  features: featuresExpansionRouter,
  mega: megaFeaturesRouter,
  rules: rulesEngineRouter,
  integrations: integrationsRouter,
  marketplaceAdv: marketplaceAdvancedRouter,
  uploads: uploadsRouter,
  freetier: freeTierRouter,
  notifications: notificationsRouter,
  codeQuality: codeQualityRouter,
  search: advancedSearchRouter,
  crypto: cryptoRouter,
  leaderboards: leaderboardsRouter,
  achievements: achievementsRouter,
  referrals: referralsRouter,
  bots: tradingBotsRouter,
  wallet: walletRouter,
  gamification: gamificationRouter,
  earnLearn: earnLearnRouter,
  aiCodeEngineer: aiCodeEngineerRouter,
  seed: seedRouter,
  phase21: phase21RealtimeRouter,
  phase22: phase22AiMlRouter,
  phase23: phase23AdminDashboardRouter,
  phase24: phase24AnalyticsRouter,
  phase25: phase25NotificationsRouter,
  phase26: phase26MobileRouter,
  phase27: phase27SecurityRouter,
  phase28: phase28PerformanceRouter,
  phase29: phase29UiRouter,
  phase30: phase30GatewayRouter,
});

export type AppRouter = typeof appRouter;

import { phase32Router } from "./routers/phase32-v1-features";
import { phase33Router } from "./routers/phase33-v2-features";
import { phase34Router } from "./routers/phase34-v3-features";
import { phase35Router } from "./routers/phase35-v4-features";
import { phase36Router } from "./routers/phase36-v45-features";
import { phase37Router } from "./routers/phase37-new-sections";
import { phase38Router } from "./routers/phase38-integration";
import { phase39Router } from "./routers/phase39-advanced";
import { phase40Router } from "./routers/phase40-final-push";

// Add to appRouter
export const appRouter = router({
  // ... existing routers ...
  phase32: phase32Router,
  phase33: phase33Router,
  phase34: phase34Router,
  phase35: phase35Router,
  phase36: phase36Router,
  phase37: phase37Router,
  phase38: phase38Router,
  phase39: phase39Router,
  phase40: phase40Router,
});
