import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  Clock, 
  Share2, 
  Target,
  Package,
  UserPlus,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GroupOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendorData, setVendorData] = useState<any>(null);
  const [activeGroups, setActiveGroups] = useState<any[]>([]);
  const [newGroupForm, setNewGroupForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
    endDate: "",
    category: ""
  });

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (!data) {
      navigate('/vendor-auth');
      return;
    }
    setVendorData(JSON.parse(data));

    // Mock group orders data
    setActiveGroups([
      {
        id: 1,
        title: "Bulk Spices Order",
        description: "Ordering spices in bulk for better prices from Spice King Distributors",
        creator: "Raj's Food Cart",
        participants: 8,
        targetAmount: 5000,
        currentAmount: 3200,
        endDate: "2024-01-25",
        category: "Spices",
        isParticipant: false
      },
      {
        id: 2,
        title: "Fresh Vegetables Weekly",
        description: "Weekly bulk order for fresh vegetables from Fresh Valley Farms",
        creator: "Street Spice Hub",
        participants: 12,
        targetAmount: 8000,
        currentAmount: 6400,
        endDate: "2024-01-22",
        category: "Vegetables",
        isParticipant: true
      },
      {
        id: 3,
        title: "Rice & Grains Bulk",
        description: "Monthly bulk order for rice and grains with 20% discount",
        creator: "Food Corner Express",
        participants: 6,
        targetAmount: 10000,
        currentAmount: 4500,
        endDate: "2024-01-28",
        category: "Grains",
        isParticipant: false
      }
    ]);
  }, [navigate]);

  const createGroup = () => {
    if (!newGroupForm.title || !newGroupForm.targetAmount || !newGroupForm.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newGroup = {
      id: Date.now(),
      ...newGroupForm,
      creator: vendorData.name,
      participants: 1,
      currentAmount: 0,
      isParticipant: true,
      targetAmount: parseFloat(newGroupForm.targetAmount)
    };

    setActiveGroups([newGroup, ...activeGroups]);
    setNewGroupForm({
      title: "",
      description: "",
      targetAmount: "",
      endDate: "",
      category: ""
    });

    toast({
      title: "Group Order Created!",
      description: "Your group order has been created and is now live.",
    });
  };

  const joinGroup = (groupId: number) => {
    setActiveGroups(activeGroups.map(group => 
      group.id === groupId 
        ? { ...group, participants: group.participants + 1, isParticipant: true }
        : group
    ));

    toast({
      title: "Joined Group!",
      description: "You've successfully joined the group order.",
    });
  };

  const shareGroup = (group: any) => {
    // Mock share functionality
    toast({
      title: "Group Shared!",
      description: "Group order link has been copied to clipboard.",
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
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient">Group Orders</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Welcome, {vendorData.name}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Create New Group Section */}
        <Card className="card-elevated p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-primary" />
            Create New Group Order
          </h2>
          <p className="text-muted-foreground mb-6">
            Start a group order to get better bulk pricing and share shipping costs with other vendors.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Group Order Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bulk Spices Order"
                  value={newGroupForm.title}
                  onChange={(e) => setNewGroupForm({...newGroupForm, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Spices, Vegetables, Grains"
                  value={newGroupForm.category}
                  onChange={(e) => setNewGroupForm({...newGroupForm, category: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (₹) *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="5000"
                    value={newGroupForm.targetAmount}
                    onChange={(e) => setNewGroupForm({...newGroupForm, targetAmount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newGroupForm.endDate}
                    onChange={(e) => setNewGroupForm({...newGroupForm, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're ordering and any special requirements..."
                  value={newGroupForm.description}
                  onChange={(e) => setNewGroupForm({...newGroupForm, description: e.target.value})}
                  className="min-h-[120px]"
                />
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full" 
                onClick={createGroup}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group Order
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Group Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Active Group Orders</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {activeGroups.map((group) => (
              <Card key={group.id} className="card-product p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{group.title}</h3>
                      {group.category && (
                        <Badge variant="outline">{group.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Created by: <span className="font-medium">{group.creator}</span>
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => shareGroup(group)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>₹{group.currentAmount} / ₹{group.targetAmount}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((group.currentAmount / group.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{Math.round((group.currentAmount / group.targetAmount) * 100)}% complete</span>
                    <span>{group.participants} participants</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{group.participants}</p>
                    <p className="text-xs text-muted-foreground">Vendors</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-sm font-medium">₹{group.targetAmount}</p>
                    <p className="text-xs text-muted-foreground">Target</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                    <p className="text-sm font-medium">{group.endDate}</p>
                    <p className="text-xs text-muted-foreground">Ends</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {group.isParticipant ? (
                    <Button variant="outline" className="flex-1" disabled>
                      <Package className="w-4 h-4 mr-2" />
                      Participating
                    </Button>
                  ) : (
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => joinGroup(group.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join Group
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="card-elevated p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">How Group Orders Work</h3>
          <p className="text-muted-foreground mb-6">
            Join forces with other vendors to get better prices and split shipping costs.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h4 className="font-medium">Create or Join</h4>
              <p className="text-sm text-muted-foreground">
                Start a new group order or join an existing one
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg font-bold text-secondary">2</span>
              </div>
              <h4 className="font-medium">Collaborate</h4>
              <p className="text-sm text-muted-foreground">
                Work together to reach the minimum order amount
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg font-bold text-success">3</span>
              </div>
              <h4 className="font-medium">Save Money</h4>
              <p className="text-sm text-muted-foreground">
                Enjoy bulk discounts and shared shipping costs
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GroupOrder;