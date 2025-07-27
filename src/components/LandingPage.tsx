import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Store, Truck, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-marketplace.jpg";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">StreetSupply+</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/get-started')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Connect Street Food{" "}
              <span className="text-gradient">Vendors</span> with{" "}
              <span className="text-gradient">Suppliers</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The ultimate B2B marketplace for street food vendors to discover,
              compare, and order from local suppliers with real-time pricing and
              inventory.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <Card className="card-elevated p-6 hover-lift">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">I'm a Vendor</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Find suppliers, compare prices, and manage your orders efficiently.
                </p>
                <Button 
                  variant="gradient" 
                  className="w-full hover:scale-105 transition-transform duration-200" 
                  onClick={() => navigate('/vendor-auth')}
                >
                  Start Sourcing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>

              <Card className="card-elevated p-6 hover-lift">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">I'm a Supplier</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  List your products, manage inventory, and grow your business.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/supplier-auth')}
                >
                  Start Selling
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Street food marketplace"
              className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose <span className="text-gradient">StreetSupply+</span>?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built specifically for street food vendors and suppliers to streamline
              the supply chain with modern technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-product p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Location-Based</h4>
              <p className="text-muted-foreground">
                Find suppliers near you with interactive maps and real-time availability.
              </p>
            </Card>

            <Card className="card-product p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">AI Price Forecasting</h4>
              <p className="text-muted-foreground">
                Smart pricing insights to help you make better purchasing decisions.
              </p>
            </Card>

            <Card className="card-product p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-success" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Group Orders</h4>
              <p className="text-muted-foreground">
                Collaborate with other vendors for better bulk pricing and deals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;