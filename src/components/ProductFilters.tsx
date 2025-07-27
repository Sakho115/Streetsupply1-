import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Filter, 
  X,
  MapPin,
  Star,
  Package,
  DollarSign,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProductFilters = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendorData, setVendorData] = useState<any>(null);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    categories: [] as string[],
    suppliers: [] as string[],
    minRating: 0,
    maxDistance: 10,
    inStock: true,
    verified: false,
    fastDelivery: false,
    organic: false
  });

  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (!data) {
      navigate('/vendor-auth');
      return;
    }
    setVendorData(JSON.parse(data));
  }, [navigate]);

  const categories = [
    "Vegetables",
    "Spices",
    "Grains & Rice",
    "Cooking Oil",
    "Dairy Products",
    "Meat & Seafood",
    "Fruits",
    "Beverages",
    "Snacks",
    "Condiments"
  ];

  const suppliers = [
    "Fresh Valley Farms",
    "Spice King Distributors",
    "Metro Food Supplies",
    "Green Harvest Co.",
    "Urban Fresh Market",
    "Quality Ingredients Ltd",
    "Farm Direct Supply",
    "Organic Essentials"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, categories: [...filters.categories, category]});
    } else {
      setFilters({...filters, categories: filters.categories.filter(c => c !== category)});
    }
  };

  const handleSupplierChange = (supplier: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, suppliers: [...filters.suppliers, supplier]});
    } else {
      setFilters({...filters, suppliers: filters.suppliers.filter(s => s !== supplier)});
    }
  };

  const applyFilters = () => {
    const filterLabels = [];
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
      filterLabels.push(`₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`);
    }
    
    filters.categories.forEach(cat => filterLabels.push(cat));
    filters.suppliers.forEach(sup => filterLabels.push(sup));
    
    if (filters.minRating > 0) {
      filterLabels.push(`${filters.minRating}+ Stars`);
    }
    
    if (filters.maxDistance < 10) {
      filterLabels.push(`Within ${filters.maxDistance}km`);
    }
    
    if (filters.inStock) filterLabels.push("In Stock");
    if (filters.verified) filterLabels.push("Verified");
    if (filters.fastDelivery) filterLabels.push("Fast Delivery");
    if (filters.organic) filterLabels.push("Organic");

    setAppliedFilters(filterLabels);
    
    toast({
      title: "Filters Applied!",
      description: `${filterLabels.length} filters have been applied to your search.`,
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      categories: [],
      suppliers: [],
      minRating: 0,
      maxDistance: 10,
      inStock: true,
      verified: false,
      fastDelivery: false,
      organic: false
    });
    setAppliedFilters([]);
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const removeFilter = (filterToRemove: string) => {
    // Logic to remove specific filter
    setAppliedFilters(appliedFilters.filter(f => f !== filterToRemove));
    
    toast({
      title: "Filter Removed",
      description: `"${filterToRemove}" filter has been removed.`,
    });
  };

  if (!vendorData) return null;

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
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient">Product Filters</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Welcome, {vendorData.name}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Range */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Price Range (per kg/unit)
              </h3>
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({...filters, priceRange: value})}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </Card>

            {/* Categories */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                Categories
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                    />
                    <Label htmlFor={category} className="text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Suppliers */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Suppliers</h3>
              <div className="space-y-3">
                {suppliers.map((supplier) => (
                  <div key={supplier} className="flex items-center space-x-2">
                    <Checkbox
                      id={supplier}
                      checked={filters.suppliers.includes(supplier)}
                      onCheckedChange={(checked) => handleSupplierChange(supplier, !!checked)}
                    />
                    <Label htmlFor={supplier} className="text-sm font-normal">
                      {supplier}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rating & Distance */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-primary" />
                  Minimum Rating
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={[filters.minRating]}
                    onValueChange={(value) => setFilters({...filters, minRating: value[0]})}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0</span>
                    <span className="font-medium">{filters.minRating} stars</span>
                    <span>5</span>
                  </div>
                </div>
              </Card>

              <Card className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Max Distance
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={[filters.maxDistance]}
                    onValueChange={(value) => setFilters({...filters, maxDistance: value[0]})}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0 km</span>
                    <span className="font-medium">{filters.maxDistance} km</span>
                    <span>50 km</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Options */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Additional Options</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => setFilters({...filters, inStock: !!checked})}
                  />
                  <Label htmlFor="inStock" className="text-sm font-normal">
                    In Stock Only
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => setFilters({...filters, verified: !!checked})}
                  />
                  <Label htmlFor="verified" className="text-sm font-normal">
                    Verified Suppliers
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fastDelivery"
                    checked={filters.fastDelivery}
                    onCheckedChange={(checked) => setFilters({...filters, fastDelivery: !!checked})}
                  />
                  <Label htmlFor="fastDelivery" className="text-sm font-normal">
                    Fast Delivery
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="organic"
                    checked={filters.organic}
                    onCheckedChange={(checked) => setFilters({...filters, organic: !!checked})}
                  />
                  <Label htmlFor="organic" className="text-sm font-normal">
                    Organic Products
                  </Label>
                </div>
              </div>
            </Card>
          </div>

          {/* Applied Filters & Actions */}
          <div className="space-y-6">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Applied Filters</h3>
              {appliedFilters.length === 0 ? (
                <p className="text-muted-foreground text-sm">No filters applied yet.</p>
              ) : (
                <div className="space-y-2">
                  {appliedFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center justify-between w-full">
                      <span className="truncate">{filter}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-2"
                        onClick={() => removeFilter(filter)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={applyFilters}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate('/vendor-dashboard')}
                >
                  Back to Products
                </Button>
              </div>
            </Card>

            {/* Filter Summary */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Filter Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span className="font-medium">{filters.categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Suppliers:</span>
                  <span className="font-medium">{filters.suppliers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Range:</span>
                  <span className="font-medium">₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Rating:</span>
                  <span className="font-medium">{filters.minRating}+ stars</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Distance:</span>
                  <span className="font-medium">{filters.maxDistance} km</span>
                </div>
              </div>
            </Card>

            {/* Quick Filters */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Filters</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Recently Added
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Top Rated
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Best Price
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearby
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;