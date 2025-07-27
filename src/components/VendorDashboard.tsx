import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Store, 
  MapPin, 
  Star, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  Filter,
  Plus,
  Clock,
  Package,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Import product images
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import onionsImg from "@/assets/products/onions.jpg";
import peppersImg from "@/assets/products/peppers.jpg";
import garamMasalaImg from "@/assets/products/garam-masala.jpg";
import chiliPowderImg from "@/assets/products/chili-powder.jpg";
import turmericImg from "@/assets/products/turmeric.jpg";
import riceImg from "@/assets/products/rice.jpg";
import oilImg from "@/assets/products/oil.jpg";
import flourImg from "@/assets/products/flour.jpg";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendorData, setVendorData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (!data) {
      navigate('/vendor-auth');
      return;
    }
    setVendorData(JSON.parse(data));
  }, [navigate]);

  // Mock supplier data
  const suppliers = [
    {
      id: 1,
      name: "Fresh Valley Farms",
      location: "2.3 km away",
      rating: 4.8,
      image: "/api/placeholder/300/200",
      verified: true,
      products: [
        { id: 1, name: "Organic Tomatoes", price: 45, unit: "kg", stock: 150, image: tomatoesImg },
        { id: 2, name: "Fresh Onions", price: 25, unit: "kg", stock: 200, image: onionsImg },
        { id: 3, name: "Bell Peppers", price: 65, unit: "kg", stock: 80, image: peppersImg },
      ]
    },
    {
      id: 2,
      name: "Spice King Distributors",
      location: "1.8 km away",
      rating: 4.9,
      image: "/api/placeholder/300/200",
      verified: true,
      products: [
        { id: 4, name: "Garam Masala", price: 180, unit: "500g", stock: 50, image: garamMasalaImg },
        { id: 5, name: "Red Chili Powder", price: 120, unit: "kg", stock: 100, image: chiliPowderImg },
        { id: 6, name: "Turmeric Powder", price: 140, unit: "kg", stock: 75, image: turmericImg },
      ]
    },
    {
      id: 3,
      name: "Metro Food Supplies",
      location: "3.1 km away",
      rating: 4.6,
      image: "/api/placeholder/300/200",
      verified: true,
      products: [
        { id: 7, name: "Basmati Rice", price: 85, unit: "kg", stock: 300, image: riceImg },
        { id: 8, name: "Cooking Oil", price: 110, unit: "liter", stock: 120, image: oilImg },
        { id: 9, name: "Wheat Flour", price: 35, unit: "kg", stock: 250, image: flourImg },
      ]
    }
  ];

  const allProducts = suppliers.flatMap(supplier => 
    supplier.products.map(product => ({
      ...product,
      supplier: supplier.name,
      supplierRating: supplier.rating,
      supplierLocation: supplier.location
    }))
  );

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const priceForecasts = [
    { item: "Tomatoes", currentPrice: 45, predictedPrice: 52, trend: "up", change: "+15%" },
    { item: "Onions", currentPrice: 25, predictedPrice: 22, trend: "down", change: "-12%" },
    { item: "Rice", currentPrice: 85, predictedPrice: 88, trend: "up", change: "+4%" },
  ];

  if (!vendorData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">StreetSupply+</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {vendorData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/vendor-profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs animate-bounce">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                localStorage.removeItem('vendorData');
                navigate('/');
              }}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="products">Browse Products</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="live">🔴 Live Market</TabsTrigger>
              <TabsTrigger value="ai">🤖 AI Optimizer</TabsTrigger>
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
            </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-elevated p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or suppliers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={() => navigate('/product-filters')}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="gradient" onClick={() => navigate('/group-order')}>
                  <Users className="w-4 h-4 mr-2" />
                  Group Order
                </Button>
              </div>
            </Card>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="card-product overflow-hidden hover:scale-105 transition-all duration-300">
                  <div className="aspect-square bg-muted rounded-t-xl relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge className="absolute top-2 right-2 bg-success text-success-foreground backdrop-blur-sm">
                      In Stock: {product.stock}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.supplier}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        ₹{product.price}/{product.unit}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.supplierRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {product.supplierLocation}
                      </span>
                      <Button 
                        size="sm" 
                        variant="gradient"
                        onClick={() => addToCart(product)}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.id} className="card-product overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                    <Store className="w-16 h-16 text-muted-foreground" />
                    {supplier.verified && (
                      <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{supplier.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{supplier.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {supplier.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {supplier.products.length} products available
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate(`/supplier/${supplier.id}/products`)}>
                      View Products
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-6">
            <Card className="card-elevated p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                AI Price Forecasts
              </h3>
              <p className="text-muted-foreground mb-6">
                Predicted price changes for the next 7 days based on market trends
              </p>
              <div className="space-y-4">
                {priceForecasts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.item}</h4>
                      <p className="text-sm text-muted-foreground">Current: ₹{item.currentPrice}/kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.predictedPrice}/kg</p>
                      <p className={`text-sm ${item.trend === 'up' ? 'text-destructive' : 'text-success'}`}>
                        {item.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">🔴 Live Marketplace</h3>
              <p className="text-muted-foreground">Real-time auctions and dynamic pricing</p>
              <Button 
                variant="hero" 
                className="mt-4"
                onClick={() => navigate('/live-marketplace')}
              >
                Enter Live Market
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">🤖 AI Supply Optimizer</h3>
              <p className="text-muted-foreground">Let AI optimize your supply chain</p>
              <Button 
                variant="gradient" 
                className="mt-4 btn-premium"
                onClick={() => navigate('/ai-optimizer')}
              >
                Launch AI Optimizer
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">📊 Advanced Analytics</h3>
              <p className="text-muted-foreground">Deep insights into your business</p>
              <Button 
                variant="gradient" 
                className="mt-4"
                onClick={() => navigate('/analytics')}
              >
                View Analytics
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="card-elevated p-6 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start browsing products to place your first order
              </p>
              <Button variant="gradient">
                Browse Products
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;