import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Filter,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Inventory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('supplierProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category.toLowerCase())))];

  const updateStock = (id: number, newStock: number) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    toast({
      title: "Stock Updated",
      description: "Product stock has been updated successfully.",
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-destructive", icon: AlertTriangle };
    if (stock < 20) return { label: "Low Stock", color: "bg-warning", icon: TrendingDown };
    if (stock < 50) return { label: "Medium Stock", color: "bg-secondary", icon: TrendingUp };
    return { label: "In Stock", color: "bg-success", icon: CheckCircle };
  };

  const analytics = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStock: products.filter(p => p.stock < 20).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Inventory Management</h1>
                <p className="text-sm text-muted-foreground">Track and manage your products</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/supplier-dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{analytics.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold">₹{analytics.totalValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">{analytics.lowStock}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-warning" />
            </div>
          </Card>
          
          <Card className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{analytics.outOfStock}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">All Products</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-elevated p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </Card>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const StatusIcon = stockStatus.icon;
                
                return (
                  <Card key={product.id} className="card-product overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                      <Package className="w-12 h-12 text-muted-foreground" />
                      <Badge className={`absolute top-2 right-2 ${stockStatus.color} text-white`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {product.stock}
                      </Badge>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-lg font-bold text-primary mb-3">
                        ₹{product.price}/{product.unit}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={product.stock}
                            onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                            className="flex-1 h-8"
                            min="0"
                          />
                          <span className="text-sm text-muted-foreground">{product.unit}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="low-stock" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.stock < 20).map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const StatusIcon = stockStatus.icon;
                
                return (
                  <Card key={product.id} className="card-product border-warning/50">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge className={`${stockStatus.color} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {stockStatus.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">Current Stock: {product.stock} {product.unit}</p>
                        <p className="text-sm text-muted-foreground">Price: ₹{product.price}/{product.unit}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Restock amount"
                          className="flex-1"
                          min="1"
                        />
                        <Button size="sm" variant="gradient">
                          Restock
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4">Stock Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In Stock</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium">{products.filter(p => p.stock >= 50).length}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Stock</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm font-medium">{products.filter(p => p.stock >= 20 && p.stock < 50).length}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Stock</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-warning rounded-full"></div>
                      <span className="text-sm font-medium">{analytics.lowStock}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Out of Stock</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-destructive rounded-full"></div>
                      <span className="text-sm font-medium">{analytics.outOfStock}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {categories.slice(1).map((category) => {
                    const categoryProducts = products.filter(p => p.category.toLowerCase() === category);
                    const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
                    
                    return (
                      <div key={category} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                          <p className="text-sm text-muted-foreground">{categoryProducts.length} products</p>
                        </div>
                        <p className="font-medium">₹{categoryValue.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Inventory;