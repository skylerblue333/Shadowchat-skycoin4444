import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Engineer from "./pages/Engineer";
import School from "./pages/School";
import Arcade from "./pages/Arcade";
import Governance from "./pages/Governance";
import Analytics from "./pages/Analytics";
import Charity from "./pages/Charity";
import Marketplace from "./pages/Marketplace";
import DayTradeRoom from "./pages/DayTradeRoom";
import EscrowShop from "./pages/EscrowShop";
import VideoArea from "./pages/VideoArea";
import SocialMedia from "./pages/SocialMedia";
import SignUp from "./pages/SignUp";
import AdminPanel from "./pages/AdminPanel";
import NotificationsHub from "./pages/NotificationsHub";
import CodeQualityDashboard from "./pages/CodeQualityDashboard";
import Onboarding from "./pages/Onboarding";
import Search from "./pages/Search";
import Crypto from "./pages/Crypto";
import Leaderboards from "./pages/Leaderboards";
import AIEngineer from "./pages/AIEngineer";
import { VoiceNavBar } from "./components/VoiceNavBar";

// Fires the owner "new user signup" alert once after auth lands.
function OnboardTrigger() {
  const { isAuthenticated } = useAuth();
  const onboard = trpc.auth.onboard.useMutation();
  useEffect(() => {
    if (isAuthenticated) onboard.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return null;
}

function PageTransition({ component: Component }: { component: React.ComponentType }) {
  return (
    <div className="animate-in fade-in duration-300">
      <Component />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/engineer" component={Engineer} />
      <Route path="/school" component={School} />
      <Route path="/arcade" component={Arcade} />
      <Route path="/governance" component={Governance} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/charity" component={Charity} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/trading" component={DayTradeRoom} />
      <Route path="/escrow" component={EscrowShop} />
      <Route path="/videos" component={VideoArea} />
      <Route path="/social" component={SocialMedia} />
      <Route path="/signup" component={SignUp} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/notifications" component={NotificationsHub} />
      <Route path="/code-quality" component={CodeQualityDashboard} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/search" component={Search} />
      <Route path="/crypto" component={Crypto} />
      <Route path="/leaderboards" component={Leaderboards} />
      <Route path="/ai-engineer" component={AIEngineer} />
      <Route path="*" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <OnboardTrigger />
          <Layout>
            <Router />
            <VoiceNavBar />
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
