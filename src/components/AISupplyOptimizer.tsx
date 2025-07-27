import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  ArrowRight,
  Star,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AISupplyOptimizer = () => {
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any>(null);

  const optimizeSupplyChain = async () => {
    setIsOptimizing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setOptimizationResults({
        totalSavings: 12450,
        efficiencyGain: 34,
        recommendations: [
          {
            type: "cost-reduction",
            title: "Switch to Local Supplier for Tomatoes",
            description: "Fresh Valley Farms offers 15% better pricing with same quality",
            impact: "₹450/week savings",
            urgency: "high",
            confidence: 92
          },
          {
            type: "timing",
            title: "Optimal Order Timing",
            description: "Order rice on Tuesdays for 8% bulk discount",
            impact: "₹280/month savings",
            urgency: "medium",
            confidence: 87
          },
          {
            type: "inventory",
            title: "Inventory Optimization",
            description: "Reduce onion stock by 20% based on seasonal demand",
            impact: "₹320 working capital freed",
            urgency: "low",
            confidence: 94
          },
          {
            type: "supplier",
            title: "New Supplier Opportunity",
            description: "Metro Spices offers premium quality at 12% lower cost",
            impact: "₹680/month savings",
            urgency: "high",
            confidence: 89
          }
        ],
        predictiveInsights: {
          nextWeekDemand: {
            tomatoes: { predicted: 25, current: 30, variance: -17 },
            onions: { predicted: 18, current: 15, variance: +20 },
            rice: { predicted: 12, current: 12, variance: 0 }
          },
          priceAlerts: [
            { item: "Chili Powder", currentPrice: 120, predictedPrice: 135, change: +12.5 },
            { item: "Cooking Oil", currentPrice: 110, predictedPrice: 98, change: -10.9 }
          ]
        }
      });
      setIsOptimizing(false);
      
      toast({
        title: "AI Optimization Complete! 🤖",
        description: "Found 4 optimization opportunities worth ₹12,450 in potential savings.",
      });
    }, 3000);
  };

  const implementRecommendation = (recommendation: any) => {
    toast({
      title: "Recommendation Queued ⚡",
      description: `${recommendation.title} has been added to your action plan.`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cost-reduction": return <DollarSign className="w-4 h-4" />;
      case "timing": return <Clock className="w-4 h-4" />;
      case "inventory": return <Package className="w-4 h-4" />;
      case "supplier": return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">AI Supply Optimizer</h2>
              <p className="text-muted-foreground">Powered by machine learning algorithms</p>
            </div>
          </div>
          <Badge className="sparkle bg-gradient-to-r from-violet-500 to-purple-600 text-white">
            Beta ✨
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Our AI analyzes market trends, supplier performance, and your purchase patterns to optimize your supply chain in real-time.
        </p>
        
        <Button 
          onClick={optimizeSupplyChain}
          disabled={isOptimizing}
          className="btn-premium hover:shadow-violet-500/25"
          size="lg"
        >
          {isOptimizing ? (
            <>
              <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Run AI Optimization
            </>
          )}
        </Button>
      </Card>

      {optimizationResults && (
        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {/* Savings Summary */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="card-glow p-4 text-center">
                <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-success">₹{optimizationResults.totalSavings}</p>
                <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
              </Card>
              <Card className="card-glow p-4 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{optimizationResults.efficiencyGain}%</p>
                <p className="text-sm text-muted-foreground">Efficiency Improvement</p>
              </Card>
              <Card className="card-glow p-4 text-center">
                <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-secondary">{optimizationResults.recommendations.length}</p>
                <p className="text-sm text-muted-foreground">Action Items</p>
              </Card>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              {optimizationResults.recommendations.map((rec: any, index: number) => (
                <Card key={index} className="card-interactive p-6 hover:border-violet-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(rec.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge className={getUrgencyColor(rec.urgency)}>
                            {rec.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-success font-medium">{rec.impact}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-muted-foreground">{rec.confidence}% confidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => implementRecommendation(rec)}
                      className="hover:bg-violet-500/10 hover:border-violet-500/30"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Implement
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Next Week Demand Forecast
              </h3>
              <div className="space-y-4">
                {Object.entries(optimizationResults.predictiveInsights.nextWeekDemand).map(([item, data]: [string, any]) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium capitalize">{item}</h4>
                      <p className="text-sm text-muted-foreground">Current stock: {data.current} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Predicted: {data.predicted} kg</p>
                      <p className={`text-sm ${data.variance > 0 ? 'text-destructive' : data.variance < 0 ? 'text-success' : 'text-muted-foreground'}`}>
                        {data.variance > 0 ? '+' : ''}{data.variance}% variance
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Price Movement Alerts
              </h3>
              <div className="space-y-3">
                {optimizationResults.predictiveInsights.priceAlerts.map((alert: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">{alert.item}</h4>
                      <p className="text-sm text-muted-foreground">Current: ₹{alert.currentPrice}/kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Predicted: ₹{alert.predictedPrice}/kg</p>
                      <p className={`text-sm ${alert.change > 0 ? 'text-destructive' : 'text-success'}`}>
                        {alert.change > 0 ? '+' : ''}{alert.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">AI-Powered Business Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary">Seasonal Opportunity</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Winter demand for hot spices increases by 40%. Consider stocking up on garam masala and chili powder by next week.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-secondary">Growth Pattern</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your order volume has grown 45% over the last 3 months. Consider negotiating better bulk rates with your top 3 suppliers.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success">Supplier Performance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fresh Valley Farms has 98% on-time delivery rate and consistently high quality ratings. Great choice for your primary vegetable supplier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AISupplyOptimizer;