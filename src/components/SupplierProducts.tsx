import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Store, 
  Star,
  MapPin,
  Package,
  Phone,
  Mail,
  Clock,
  Truck,
  Shield
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierProducts = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const { toast } = useToast();
  const [vendorData, setVendorData] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (!data) {
      navigate('/vendor-auth');
      return;
    }
    setVendorData(JSON.parse(data));

    // Mock supplier data - in real app, fetch based on supplierId
    const supplierData = {
      id: supplierId || 1,
      name: "Fresh Valley Farms",
      location: "2.3 km away",
      address: "123 Farm Street, Green Valley, City",
      rating: 4.8,
      totalReviews: 156,
      image: "/api/placeholder/400/300",
      verified: true,
      established: "2018",
      specialties: ["Organic Vegetables", "Fresh Produce", "Seasonal Fruits"],
      contact: {
        phone: "+91 9876543210",
        email: "orders@freshvalley.com",
        website: "www.freshvalleyfarms.com"
      },
      businessHours: "6:00 AM - 8:00 PM",
      deliveryOptions: ["Same Day", "Next Day", "Scheduled"],
      minimumOrder: 500,
      products: [
        { 
          id: 1, 
          name: "Organic Tomatoes", 
          price: 45, 
          unit: "kg", 
          stock: 150, 
          image: "/api/placeholder/200/200",
          description: "Fresh organic tomatoes grown without pesticides",
          category: "Vegetables",
          organic: true,
          discount: 10
        },
        { 
          id: 2, 
          name: "Fresh Onions", 
          price: 25, 
          unit: "kg", 
          stock: 200, 
          image: "/api/placeholder/200/200",
          description: "High quality fresh onions, perfect for cooking",
          category: "Vegetables",
          organic: false,
          discount: 0
        },
        { 
          id: 3, 
          name: "Bell Peppers", 
          price: 65, 
          unit: "kg", 
          stock: 80, 
          image: "/api/placeholder/200/200",
          description: "Colorful bell peppers in red, yellow, and green",
          category: "Vegetables",
          organic: true,
          discount: 15
        },
        { 
          id: 4, 
          name: "Fresh Carrots", 
          price: 35, 
          unit: "kg", 
          stock: 120, 
          image: "/api/placeholder/200/200",
          description: "Sweet and crunchy carrots, rich in vitamins",
          category: "Vegetables",
          organic: true,
          discount: 5
        },
        { 
          id: 5, 
          name: "Green Spinach", 
          price: 40, 
          unit: "kg", 
          stock: 90, 
          image: "/api/placeholder/200/200",
          description: "Fresh green spinach leaves, iron-rich",
          category: "Leafy Greens",
          organic: true,
          discount: 0
        },
        { 
          id: 6, 
          name: "Potatoes", 
          price: 30, 
          unit: "kg", 
          stock: 300, 
          image: "/api/placeholder/200/200",
          description: "High quality potatoes, perfect for all dishes",
          category: "Vegetables",
          organic: false,
          discount: 8
        }
      ]
    };

    setSupplier(supplierData);
  }, [navigate, supplierId]);

  const addToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const contactSupplier = () => {
    toast({
      title: "Contact Information",
      description: "Supplier contact details have been shared with you.",
    });
  };

  if (!vendorData || !supplier) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/vendor-dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient">{supplier.name}</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Welcome, {vendorData.name}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Supplier Info */}
        <Card className="card-elevated p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Supplier Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <Store className="w-16 h-16 text-muted-foreground" />
            </div>

            {/* Supplier Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{supplier.name}</h1>
                    {supplier.verified && (
                      <Badge className="bg-success text-success-foreground">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="ml-1">({supplier.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{supplier.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{supplier.address}</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="gradient" onClick={contactSupplier}>
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>

              {/* Business Info */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Business Hours</p>
                  <p className="text-xs text-muted-foreground">{supplier.businessHours}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Truck className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-sm font-medium">Delivery</p>
                  <p className="text-xs text-muted-foreground">{supplier.deliveryOptions.join(", ")}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Package className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-sm font-medium">Min Order</p>
                  <p className="text-xs text-muted-foreground">₹{supplier.minimumOrder}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Products Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Available Products ({supplier.products.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {supplier.products.map((product: any) => (
              <Card key={product.id} className="card-product overflow-hidden">
                <div className="aspect-square bg-muted rounded-t-xl relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.organic && (
                      <Badge className="bg-success text-success-foreground text-xs">
                        Organic
                      </Badge>
                    )}
                    {product.discount > 0 && (
                      <Badge className="bg-destructive text-destructive-foreground text-xs">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {product.stock} in stock
                  </Badge>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {product.discount > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">
                            ₹{Math.round(product.price * (1 - product.discount / 100))}/{product.unit}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          ₹{product.price}/{product.unit}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info Card */}
        <Card className="card-elevated p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{supplier.contact.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{supplier.contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium">Website</p>
                <p className="text-sm text-muted-foreground">{supplier.contact.website}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupplierProducts;