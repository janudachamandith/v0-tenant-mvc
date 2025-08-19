import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import SearchProperties from "./pages/SearchProperties";
import BookProperty from "./pages/BookProperty";
import PayRent from "./pages/PayRent";
import Agreements from "./pages/Agreements";
import ReportIssue from "./pages/ReportIssue";
import TrackIssues from "./pages/TrackIssues";
import MyReviews from "./pages/MyReviews";
import Notifications from "./pages/Notifications";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="search" element={<SearchProperties />} />
            <Route path="bookings" element={<BookProperty />} />
            <Route path="pay-rent" element={<PayRent />} />
            <Route path="agreements" element={<Agreements />} />
            <Route path="report-issue" element={<ReportIssue />} />
            <Route path="track-issues" element={<TrackIssues />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
