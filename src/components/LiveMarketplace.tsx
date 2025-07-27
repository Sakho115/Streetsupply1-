import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Radio, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  MapPin,
  Star,
  Zap,
  ShoppingCart,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveMarketplace = () => {
  const { toast } = useToast();
  const [liveData, setLiveData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [bidPrice, setBidPrice] = useState<string>("");
  const [showBidModal, setShowBidModal] = useState<any>(null);

  useEffect(() => {
    // Simulate real-time market data
    const initialData = [
      {
        id: 1,
        name: "Premium Basmati Rice",
        supplier: "Golden Grain Mills",
        location: "1.2 km away",
        currentPrice: 85,
        previousPrice: 88,
        trend: "down",
        change: -3.4,
        stock: 500,
        rating: 4.8,
        bidsActive: 12,
        timeLeft: "2h 45m",
        minBid: 82,
        quality: "Premium A+",
        certification: "Organic",
        lastUpdated: "2 mins ago"
      },
      {
        id: 2,
        name: "Fresh Organic Tomatoes",
        supplier: "Fresh Valley Farms",
        location: "0.8 km away",
        currentPrice: 45,
        previousPrice: 42,
        trend: "up",
        change: +7.1,
        stock: 200,
        rating: 4.9,
        bidsActive: 8,
        timeLeft: "1h 20m",
        minBid: 44,
        quality: "Grade A",
        certification: "Organic",
        lastUpdated: "1 min ago"
      },
      {
        id: 3,
        name: "Red Chili Powder",
        supplier: "Spice King Distributors",
        location: "1.5 km away",
        currentPrice: 120,
        previousPrice: 125,
        trend: "down",
        change: -4.0,
        stock: 80,
        rating: 4.7,
        bidsActive: 15,
        timeLeft: "45m",
        minBid: 118,
        quality: "Export Quality",
        certification: "FSSAI",
        lastUpdated: "30 sec ago"
      },
      {
        id: 4,
        name: "Cooking Oil (Refined)",
        supplier: "Pure Oil Industries",
        location: "2.1 km away",
        currentPrice: 110,
        previousPrice: 107,
        trend: "up",
        change: +2.8,
        stock: 150,
        rating: 4.6,
        bidsActive: 6,
        timeLeft: "3h 15m",
        minBid: 108,
        quality: "Refined",
        certification: "BIS",
        lastUpdated: "45 sec ago"
      }
    ];

    setLiveData(initialData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveData(prevData => 
        prevData.map(item => ({
          ...item,
          currentPrice: Math.max(
            item.minBid - 2,
            item.currentPrice + (Math.random() - 0.5) * 3
          ),
          bidsActive: Math.max(0, item.bidsActive + Math.floor((Math.random() - 0.5) * 3)),
          lastUpdated: "Just now"
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const placeBid = (item: any, bidAmount: number) => {
    if (bidAmount < item.minBid) {
      toast({
        title: "Bid Too Low",
        description: `Minimum bid is ₹${item.minBid}/kg`,
        variant: "destructive"
      });
      return;
    }

    setLiveData(prevData =>
      prevData.map(dataItem =>
        dataItem.id === item.id
          ? { 
              ...dataItem, 
              currentPrice: bidAmount,
              bidsActive: dataItem.bidsActive + 1,
              lastUpdated: "Just now"
            }
          : dataItem
      )
    );

    toast({
      title: "Bid Placed Successfully! 🎯",
      description: `Your bid of ₹${bidAmount}/kg for ${item.name} has been placed.`,
    });

    setShowBidModal(null);
    setBidPrice("");
  };

  const addToCart = (item: any) => {
    setSelectedItems([...selectedItems, item]);
    toast({
      title: "Added to Cart 🛒",
      description: `${item.name} added to your live order cart.`,
    });
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="w-4 h-4 text-destructive" /> : 
      <TrendingDown className="w-4 h-4 text-success" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-destructive" : "text-success";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center relative">
              <Radio className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Live Marketplace</h2>
              <p className="text-muted-foreground">Real-time auctions • Dynamic pricing</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-green-500 text-white animate-pulse mb-2">
              🔴 LIVE
            </Badge>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">{liveData.length}</span> active auctions
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          Join live auctions for the best prices! Bid in real-time and secure premium ingredients at competitive rates.
        </p>
      </Card>

      {/* Live Feed */}
      <div className="grid lg:grid-cols-2 gap-4">
        {liveData.map((item) => (
          <Card key={item.id} className="card-interactive p-6 relative overflow-hidden">
            {/* Live indicator */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-500 text-white animate-pulse text-xs">
                LIVE
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{item.supplier}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{item.quality}</Badge>
                    <Badge className="bg-green-500/10 text-green-700 border-green-200">
                      {item.certification}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      ₹{Math.round(item.currentPrice)}/kg
                    </span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(item.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                        {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Min bid: ₹{item.minBid}</p>
                    <p>Stock: {item.stock} kg</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{item.bidsActive} bids</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-warning" />
                      <span className="text-warning font-medium">{item.timeLeft}</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground">
                    Updated {item.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => setShowBidModal(item)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Place Bid
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Auction progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"
                style={{ 
                  width: `${Math.max(20, 100 - (parseInt(item.timeLeft.split('h')[0]) || 0) * 25)}%` 
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 animate-zoom-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Place Your Bid</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBidModal(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{showBidModal.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Current price: ₹{Math.round(showBidModal.currentPrice)}/kg
                </p>
                <p className="text-sm text-muted-foreground">
                  Minimum bid: ₹{showBidModal.minBid}/kg
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Bid (₹/kg)</label>
                <Input
                  type="number"
                  placeholder={showBidModal.minBid.toString()}
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  min={showBidModal.minBid}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBidModal(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={() => placeBid(showBidModal, parseFloat(bidPrice))}
                  disabled={!bidPrice || parseFloat(bidPrice) < showBidModal.minBid}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Place Bid
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Cart Summary */}
      {selectedItems.length > 0 && (
        <Card className="card-glow p-4 sticky bottom-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {selectedItems.length} items in live cart
              </span>
            </div>
            <Button variant="gradient" size="sm">
              Checkout Live Orders
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveMarketplace;