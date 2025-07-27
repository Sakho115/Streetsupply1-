import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Truck, Phone, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Store supplier data in localStorage for demo
    localStorage.setItem('supplierData', JSON.stringify(formData));
    toast({
      title: "Welcome to StreetSupply+!",
      description: "Your supplier account has been created.",
    });
    navigate('/supplier-dashboard');
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
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-warning rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gradient">Supplier Portal</h1>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Join as a Supplier</h2>
            <p className="text-muted-foreground">
              Connect with street food vendors and grow your business
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
              <Label htmlFor="companyName">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address (Optional)</Label>
              <Input
                id="address"
                placeholder="Enter your business address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <Button type="submit" variant="gradient" className="w-full" size="lg">
              Create Supplier Account
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/vendor-auth')}
              className="text-sm"
            >
              Are you a vendor? Join here
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupplierAuth;