import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Store, Truck, Users, MapPin, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Join the Community",
      description: "Connect with thousands of vendors and suppliers in your area"
    },
    {
      icon: <MapPin className="w-8 h-8 text-secondary" />,
      title: "Location-Based",
      description: "Find suppliers near you with real-time availability and delivery"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-success" />,
      title: "Smart Pricing",
      description: "AI-powered price forecasting to help you make better decisions"
    },
    {
      icon: <Zap className="w-8 h-8 text-warning" />,
      title: "Instant Orders",
      description: "Place orders in seconds with our streamlined ordering system"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">StreetSupply+</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Get Started with{" "}
            <span className="text-gradient">StreetSupply+</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose your path and join the future of street food supply chain management. 
            Whether you're a vendor looking for quality ingredients or a supplier wanting to grow your business.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="card-elevated p-8 text-center hover-lift">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">I'm a Vendor</h2>
            <p className="text-muted-foreground mb-6">
              Find the best suppliers in your area, compare prices, and manage your inventory efficiently with our advanced tools.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                Browse local suppliers
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                Compare prices instantly
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                Group ordering for better deals
              </div>
            </div>
            <Button 
              variant="hero" 
              className="w-full" 
              size="lg"
              onClick={() => navigate('/vendor-auth')}
            >
              Start as Vendor
            </Button>
          </Card>

          <Card className="card-elevated p-8 text-center hover-lift">
            <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">I'm a Supplier</h2>
            <p className="text-muted-foreground mb-6">
              Reach more customers, manage your inventory, and grow your business with our comprehensive supplier platform.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                List your products easily
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                Manage orders efficiently
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                Analytics and insights
              </div>
            </div>
            <Button 
              variant="gradient" 
              className="w-full" 
              size="lg"
              onClick={() => navigate('/supplier-auth')}
            >
              Start as Supplier
            </Button>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-gradient">StreetSupply+</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-product p-6 text-center">
                <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="card-elevated p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of vendors and suppliers who are already using StreetSupply+ 
            to streamline their operations and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/vendor-auth')}
            >
              Join as Vendor
            </Button>
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => navigate('/supplier-auth')}
            >
              Join as Supplier
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GetStarted;