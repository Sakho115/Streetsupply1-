import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Package, 
  CheckCircle,
  Clock,
  Truck,
  Phone,
  MapPin,
  User,
  Calendar,
  FileText,
  Download,
  MessageCircle,
  Star
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { toast } = useToast();
  const [supplierData, setSupplierData] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('supplierData');
    if (!data) {
      navigate('/supplier-auth');
      return;
    }
    setSupplierData(JSON.parse(data));

    // Mock order data - in real app, fetch based on orderId
    const orderData = {
      id: orderId || 1,
      orderNumber: `ORD-${String(orderId || 1).padStart(6, '0')}`,
      vendorName: "Raj's Food Cart",
      vendorId: "VND-001",
      status: "pending",
      orderDate: "2024-01-20T10:30:00Z",
      expectedDelivery: "2024-01-22T15:00:00Z",
      deliveryAddress: "123 Market Street, Food Court Area, City - 400001",
      contact: {
        phone: "+91 9876543210",
        email: "raj.foodcart@email.com",
        alternatePhone: "+91 9876543211"
      },
      items: [
        { 
          id: 1,
          name: "Organic Tomatoes", 
          quantity: 10, 
          unit: "kg", 
          price: 45,
          total: 450,
          category: "Vegetables",
          image: "/api/placeholder/100/100"
        },
        { 
          id: 2,
          name: "Fresh Onions", 
          quantity: 5, 
          unit: "kg", 
          price: 25,
          total: 125,
          category: "Vegetables",
          image: "/api/placeholder/100/100"
        }
      ],
      pricing: {
        subtotal: 575,
        discount: 0,
        deliveryCharges: 25,
        taxes: 30,
        total: 630
      },
      notes: "Please deliver between 2-4 PM. Call before delivery.",
      paymentMethod: "Cash on Delivery",
      timeline: [
        { status: "Order Placed", date: "2024-01-20T10:30:00Z", completed: true },
        { status: "Order Confirmed", date: null, completed: false },
        { status: "Preparing for Delivery", date: null, completed: false },
        { status: "Out for Delivery", date: null, completed: false },
        { status: "Delivered", date: null, completed: false }
      ]
    };

    setOrder(orderData);
  }, [navigate, orderId]);

  const updateOrderStatus = (newStatus: string) => {
    if (order) {
      setOrder({ ...order, status: newStatus });
      
      // Update timeline
      const updatedTimeline = order.timeline.map((item: any) => {
        if (item.status === "Order Confirmed" && newStatus === "confirmed") {
          return { ...item, date: new Date().toISOString(), completed: true };
        }
        return item;
      });
      
      setOrder({ ...order, status: newStatus, timeline: updatedTimeline });
      
      toast({
        title: "Order Updated",
        description: `Order has been ${newStatus}.`,
      });
    }
  };

  const contactVendor = () => {
    toast({
      title: "Contact Initiated",
      description: "Opening communication channel with vendor.",
    });
  };

  const downloadInvoice = () => {
    toast({
      title: "Invoice Downloaded",
      description: "Order invoice has been downloaded.",
    });
  };

  if (!supplierData || !order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'confirmed': return 'bg-primary';
      case 'preparing': return 'bg-secondary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

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
                onClick={() => navigate('/supplier-dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-warning rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient">Order Details</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Order #{order.orderNumber}</h2>
                  <p className="text-muted-foreground">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.vendorName}</p>
                    <p className="text-sm text-muted-foreground">Vendor ID: {order.vendorId}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Expected Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.expectedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Total Items</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} products</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm">Qty: {item.quantity} {item.unit}</span>
                        <span className="text-sm">Price: ₹{item.price}/{item.unit}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">₹{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Address */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Delivery Address
              </h3>
              <p className="text-muted-foreground mb-4">{order.deliveryAddress}</p>
              
              {order.notes && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Special Instructions
                  </h4>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </Card>

            {/* Order Timeline */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {order.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.status}
                      </p>
                      {step.date && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(step.date).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Actions */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Order Actions</h3>
              <div className="space-y-3">
                {order.status === 'pending' && (
                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={() => updateOrderStatus('confirmed')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Order
                  </Button>
                )}
                
                {order.status === 'confirmed' && (
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={() => updateOrderStatus('preparing')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Start Preparing
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={contactVendor}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Vendor
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={downloadInvoice}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">Primary</p>
                    <p className="text-sm text-muted-foreground">{order.contact.phone}</p>
                  </div>
                </div>
                
                {order.contact.alternatePhone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="font-medium">Alternate</p>
                      <p className="text-sm text-muted-foreground">{order.contact.alternatePhone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-success" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{order.contact.email}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.pricing.subtotal}</span>
                </div>
                
                {order.pricing.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{order.pricing.discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>₹{order.pricing.deliveryCharges}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{order.pricing.taxes}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{order.pricing.total}</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Payment Method: {order.paymentMethod}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;