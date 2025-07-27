import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield,
  Edit,
  Save,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supplierData, setSupplierData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    const data = localStorage.getItem('supplierData');
    if (!data) {
      navigate('/supplier-auth');
      return;
    }
    const supplier = JSON.parse(data);
    setSupplierData(supplier);
    setEditData(supplier);
  }, [navigate]);

  const saveProfile = () => {
    setSupplierData(editData);
    localStorage.setItem('supplierData', JSON.stringify(editData));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  if (!supplierData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-warning rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">StreetSupply+</h1>
                <p className="text-sm text-muted-foreground">Supplier Profile</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/supplier-dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="card-elevated p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-warning rounded-2xl flex items-center justify-center">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{supplierData.name}</h2>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8 Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-success" />
                      <span>Verified Supplier</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant={isEditing ? "outline" : "secondary"}
                onClick={() => {
                  if (isEditing) {
                    setEditData(supplierData);
                    setIsEditing(false);
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Business Name</Label>
                  {isEditing ? (
                    <Input
                      value={editData.name || ''}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{supplierData.name}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  {isEditing ? (
                    <Input
                      value={editData.email || ''}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{supplierData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      placeholder="+91 9876543210"
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{supplierData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.address || ''}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                      placeholder="Enter your business address"
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-start space-x-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                      <span>{supplierData.address || 'Address not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Business Hours</Label>
                  {isEditing ? (
                    <Input
                      value={editData.hours || ''}
                      onChange={(e) => setEditData({...editData, hours: e.target.value})}
                      placeholder="e.g., 9:00 AM - 6:00 PM"
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{supplierData.hours || '9:00 AM - 6:00 PM'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      placeholder="Tell vendors about your business..."
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-muted-foreground">
                      {supplierData.description || 'Quality supplier for fresh products and ingredients.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                <Button variant="outline" onClick={() => {
                  setEditData(supplierData);
                  setIsEditing(false);
                }}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={saveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          {/* Business Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-elevated p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-muted-foreground">Products Listed</p>
            </Card>
            <Card className="card-elevated p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <p className="text-muted-foreground">Regular Customers</p>
            </Card>
            <Card className="card-elevated p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">2.5k+</div>
              <p className="text-muted-foreground">Orders Fulfilled</p>
            </Card>
          </div>

          {/* Certifications */}
          <Card className="card-elevated p-6">
            <h3 className="text-xl font-semibold mb-4">Certifications & Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success text-success-foreground px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Verified Supplier
              </Badge>
              <Badge className="bg-primary text-primary-foreground px-4 py-2">
                Quality Assured
              </Badge>
              <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
                Fast Delivery
              </Badge>
              <Badge className="bg-warning text-warning-foreground px-4 py-2">
                Premium Partner
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;