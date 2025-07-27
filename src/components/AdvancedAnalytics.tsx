import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  DollarSign,
  Package,
  Clock,
  Target,
  Zap,
  Users,
  ArrowUp,
  ArrowDown,
  Activity,
  Brain,
  MapPin,
  Star
} from "lucide-react";

const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    // Simulate complex analytics data
    setAnalyticsData({
      overview: {
        totalSpent: 45680,
        totalOrders: 156,
        avgOrderValue: 293,
        supplierCount: 12,
        trends: {
          spending: +12.5,
          orders: +8.2,
          avgValue: +4.1,
          suppliers: +25.0
        }
      },
      spendingByCategory: [
        { category: "Vegetables", amount: 18500, percentage: 40.5, trend: +5.2 },
        { category: "Spices", amount: 12200, percentage: 26.7, trend: -2.1 },
        { category: "Grains", amount: 9800, percentage: 21.4, trend: +8.7 },
        { category: "Oil & Dairy", amount: 5180, percentage: 11.4, trend: +12.3 }
      ],
      topSuppliers: [
        { 
          name: "Fresh Valley Farms", 
          spent: 15200, 
          orders: 45, 
          rating: 4.8, 
          onTimeDelivery: 96,
          qualityScore: 94,
          trend: +15.2
        },
        { 
          name: "Spice King Distributors", 
          spent: 12200, 
          orders: 38, 
          rating: 4.9, 
          onTimeDelivery: 98,
          qualityScore: 97,
          trend: -3.1
        },
        { 
          name: "Metro Food Supplies", 
          spent: 9800, 
          orders: 32, 
          rating: 4.6, 
          onTimeDelivery: 92,
          qualityScore: 89,
          trend: +8.7
        }
      ],
      seasonalPatterns: {
        bestMonths: ["December", "January", "February"],
        peakDemandItems: ["Spices", "Oil", "Rice"],
        costOptimizationOpportunities: 3,
        seasonalSavings: 8500
      },
      predictiveInsights: [
        {
          type: "price_increase",
          item: "Tomatoes",
          probability: 85,
          expectedChange: +18,
          timeframe: "Next 2 weeks",
          recommendation: "Stock up now to avoid price spike"
        },
        {
          type: "supplier_issue",
          supplier: "Metro Food Supplies",
          probability: 72,
          issue: "Potential delivery delays",
          timeframe: "Next week",
          recommendation: "Consider backup supplier for critical items"
        },
        {
          type: "demand_surge",
          category: "Spices",
          probability: 90,
          expectedChange: +35,
          timeframe: "Festival season",
          recommendation: "Increase inventory for garam masala and chili powder"
        }
      ],
      efficiency: {
        orderProcessingTime: 2.4,
        supplierResponseTime: 4.8,
        deliveryAccuracy: 94,
        costSavingsVsMarket: 12.8,
        inventoryTurnover: 8.2
      }
    });
  }, []);

  if (!analyticsData) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  const formatTrend = (trend: number) => `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Advanced Analytics</h2>
              <p className="text-muted-foreground">AI-powered business intelligence</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            Pro Analytics ⚡
          </Badge>
        </div>
      </Card>

      {/* Overview KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="card-glow p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-success" />
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success font-medium">
                {formatTrend(analyticsData.overview.trends.spending)}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(analyticsData.overview.totalSpent)}</p>
          <p className="text-sm text-muted-foreground">Total Spent (6 months)</p>
        </Card>

        <Card className="card-glow p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-primary" />
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success font-medium">
                {formatTrend(analyticsData.overview.trends.orders)}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold">{analyticsData.overview.totalOrders}</p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </Card>

        <Card className="card-glow p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-secondary" />
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success font-medium">
                {formatTrend(analyticsData.overview.trends.avgValue)}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(analyticsData.overview.avgOrderValue)}</p>
          <p className="text-sm text-muted-foreground">Avg Order Value</p>
        </Card>

        <Card className="card-glow p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-warning" />
            <div className="flex items-center space-x-1 text-sm">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success font-medium">
                {formatTrend(analyticsData.overview.trends.suppliers)}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold">{analyticsData.overview.supplierCount}</p>
          <p className="text-sm text-muted-foreground">Active Suppliers</p>
        </Card>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-4">
          <Card className="card-elevated p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary" />
              Spending by Category
            </h3>
            <div className="space-y-4">
              {analyticsData.spendingByCategory.map((category: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {category.percentage}%
                      </span>
                      <span className={`text-sm font-medium ${
                        category.trend > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {formatTrend(category.trend)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-muted rounded-full mr-4">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <span className="font-bold">{formatCurrency(category.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="space-y-4">
            {analyticsData.topSuppliers.map((supplier: any, index: number) => (
              <Card key={index} className="card-interactive p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{supplier.rating}</span>
                        <span>•</span>
                        <span>{supplier.orders} orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(supplier.spent)}</p>
                    <div className="flex items-center space-x-1">
                      {supplier.trend > 0 ? (
                        <ArrowUp className="w-3 h-3 text-success" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-sm ${
                        supplier.trend > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {formatTrend(supplier.trend)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Delivery</span>
                      <span className="font-medium">{supplier.onTimeDelivery}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-success rounded-full"
                        style={{ width: `${supplier.onTimeDelivery}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality Score</span>
                      <span className="font-medium">{supplier.qualityScore}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${supplier.qualityScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="space-y-4">
            {analyticsData.predictiveInsights.map((insight: any, index: number) => (
              <Card key={index} className="card-elevated p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">AI Prediction</h3>
                      <Badge className="bg-violet-500/10 text-violet-700 border-violet-200">
                        {insight.probability}% confidence
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Target:</span> {insight.item || insight.supplier || insight.category}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Timeframe:</span> {insight.timeframe}
                      </p>
                      {insight.expectedChange && (
                        <p className="text-sm">
                          <span className="font-medium">Expected Change:</span> 
                          <span className={insight.expectedChange > 0 ? 'text-destructive' : 'text-success'}>
                            {formatTrend(insight.expectedChange)}
                          </span>
                        </p>
                      )}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-3">
                        <p className="text-sm text-primary font-medium">
                          💡 Recommendation: {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Operational Efficiency
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Order Processing Time</span>
                  <span className="font-bold">{analyticsData.efficiency.orderProcessingTime}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Supplier Response Time</span>
                  <span className="font-bold">{analyticsData.efficiency.supplierResponseTime}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Delivery Accuracy</span>
                  <span className="font-bold text-success">{analyticsData.efficiency.deliveryAccuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inventory Turnover</span>
                  <span className="font-bold">{analyticsData.efficiency.inventoryTurnover}x</span>
                </div>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-success" />
                Cost Optimization
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-success mb-2">
                  {analyticsData.efficiency.costSavingsVsMarket}%
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Savings vs Market Average
                </p>
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <p className="text-sm text-success">
                    You're saving an estimated ₹{analyticsData.seasonalPatterns.seasonalSavings}/month 
                    compared to traditional procurement methods!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;