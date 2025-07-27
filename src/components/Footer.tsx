import { Store, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">StreetSupply+</h3>
            </div>
            <p className="text-muted-foreground">
              Connecting street food vendors with suppliers through modern technology.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">For Vendors</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/vendor-dashboard" className="hover:text-primary transition-colors">Browse Products</a></li>
              <li><a href="/group-order" className="hover:text-primary transition-colors">Group Orders</a></li>
              <li><a href="/product-filters" className="hover:text-primary transition-colors">Advanced Filters</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">For Suppliers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/supplier-dashboard" className="hover:text-primary transition-colors">Manage Products</a></li>
              <li><a href="/supplier-dashboard" className="hover:text-primary transition-colors">Track Orders</a></li>
              <li><a href="/supplier-dashboard" className="hover:text-primary transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 StreetSupply+. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Created with</span>
              <Heart className="w-4 h-4 text-destructive" />
              <span>by <strong className="text-gradient">Git Monkeys</strong> for hackathon by <strong className="text-primary">Tutedude</strong></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
