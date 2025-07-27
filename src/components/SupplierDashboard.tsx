import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Truck, 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supplierData, setSupplierData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    const data = localStorage.getItem('supplierData');
    if (!data) {
      navigate('/supplier-auth');
      return;
    }
    setSupplierData(JSON.parse(data));
    
    // Load existing products from localStorage
    const savedProducts = localStorage.getItem('supplierProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      createdAt: new Date().toISOString()
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    
    setNewProduct({
      name: "",
      price: "",
      unit: "kg",
      stock: "",
      category: "",
      description: ""
    });
    setIsAddProductOpen(false);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to your inventory.`,
    });
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from your inventory.",
    });
  };

  // Mock orders data
  const orders = [
    {
      id: 1,
      vendorName: "Raj's Food Cart",
      items: [
        { name: "Organic Tomatoes", quantity: 10, unit: "kg", price: 45 },
        { name: "Fresh Onions", quantity: 5, unit: "kg", price: 25 }
      ],
      total: 575,
      status: "pending",
      orderDate: "2024-01-20",
      phone: "+91 9876543210"
    },
    {
      id: 2,
      vendorName: "Street Spice Hub",
      items: [
        { name: "Garam Masala", quantity: 2, unit: "500g", price: 180 }
      ],
      total: 360,
      status: "confirmed",
      orderDate: "2024-01-19",
      phone: "+91 9876543211"
    }
  ];

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0)
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
                <p className="text-sm text-muted-foreground">Welcome back, {supplierData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/supplier-profile')}>
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/inventory')}>
                Inventory
              </Button>
              <Button variant="gradient" onClick={() => setIsAddProductOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                localStorage.removeItem('supplierData');
                localStorage.removeItem('supplierProducts');
                navigate('/');
              }}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-secondary" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">₹{stats.revenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {products.length === 0 ? (
              <Card className="card-elevated p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Products Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by adding your first product to the inventory
                </p>
                <Button variant="hero" onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="card-product overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                      <Package className="w-12 h-12 text-muted-foreground" />
                      <Badge className={`absolute top-2 right-2 ${
                        product.stock > 50 ? 'bg-success' : 
                        product.stock > 20 ? 'bg-warning' : 'bg-destructive'
                      }`}>
                        {product.stock} in stock
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-lg font-bold text-primary mb-3">
                        ₹{product.price}/{product.unit}
                      </p>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="card-elevated p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <Badge className={
                        order.status === 'pending' ? 'bg-warning' :
                        order.status === 'confirmed' ? 'bg-success' : 'bg-muted'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="font-medium">Customer: {order.vendorName}</p>
                    <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} ({item.quantity} {item.unit})</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-lg font-bold">Total: ₹{order.total}</p>
                    <div className="space-x-2">
                      {order.status === 'pending' && (
                        <Button size="sm" variant="gradient">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirm Order
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => navigate(`/order/${order.id}`)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="card-elevated p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Business Analytics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Selling Products</h4>
                  <div className="space-y-2">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                        <span>{product.name}</span>
                        <span className="font-medium">₹{product.price}/{product.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• New order from Raj's Food Cart</p>
                    <p>• Product "Organic Tomatoes" stock updated</p>
                    <p>• Order #1 confirmed and shipped</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  placeholder="kg, liter, piece"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Vegetables, Spices, Grains..."
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={addProduct}>
                Add Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupplierDashboard;