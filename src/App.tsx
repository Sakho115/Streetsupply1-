import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VendorAuth from "./components/VendorAuth";
import SupplierAuth from "./components/SupplierAuth";
import VendorDashboard from "./components/VendorDashboard";
import SupplierDashboard from "./components/SupplierDashboard";
import GetStarted from "./components/GetStarted";
import GroupOrder from "./components/GroupOrder";
import ProductFilters from "./components/ProductFilters";
import SupplierProducts from "./components/SupplierProducts";
import OrderDetails from "./components/OrderDetails";
import VendorProfile from "./components/VendorProfile";
import SupplierProfile from "./components/SupplierProfile";
import Inventory from "./components/Inventory";
import AISupplyOptimizer from "./components/AISupplyOptimizer";
import LiveMarketplace from "./components/LiveMarketplace";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/vendor-auth" element={<VendorAuth />} />
          <Route path="/supplier-auth" element={<SupplierAuth />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/group-order" element={<GroupOrder />} />
          <Route path="/product-filters" element={<ProductFilters />} />
          <Route path="/supplier/:supplierId/products" element={<SupplierProducts />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/supplier-profile" element={<SupplierProfile />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/ai-optimizer" element={<AISupplyOptimizer />} />
          <Route path="/live-marketplace" element={<LiveMarketplace />} />
          <Route path="/analytics" element={<AdvancedAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
