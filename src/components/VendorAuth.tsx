import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Store, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VendorAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Store vendor data in localStorage for demo
    localStorage.setItem('vendorData', JSON.stringify(formData));
    toast({
      title: "Welcome to StreetSupply+!",
      description: "Your vendor account has been created.",
    });
    navigate('/vendor-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-elevated">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gradient">Vendor Portal</h1>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Join as a Vendor</h2>
            <p className="text-muted-foreground">
              Start sourcing quality ingredients from local suppliers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (Optional)</Label>
              <div className="relative">
                <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              Create Vendor Account
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/supplier-auth')}
              className="text-sm"
            >
              Are you a supplier? Join here
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VendorAuth;