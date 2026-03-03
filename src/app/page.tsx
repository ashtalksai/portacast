"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Radio,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Radio className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">PortaCast</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
                See demand{" "}
                <span className="text-primary">before it hits</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Predictive demand forecasting for portable restroom operators. 
                Know where units are needed 7-14 days in advance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2">
                    Get Early Access <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Mock Map Preview */}
              <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border shadow-2xl">
                <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-slate-100">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(8)].map((_, i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-slate-300" style={{ top: `${(i + 1) * 12.5}%` }} />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-slate-300" style={{ left: `${(i + 1) * 10}%` }} />
                    ))}
                  </div>
                  
                  {/* Heatmap blobs */}
                  <motion.div 
                    className="absolute w-32 h-32 rounded-full bg-red-500/40 blur-xl"
                    style={{ top: "20%", left: "30%" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute w-24 h-24 rounded-full bg-orange-500/40 blur-xl"
                    style={{ top: "50%", left: "60%" }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute w-20 h-20 rounded-full bg-blue-500/30 blur-xl"
                    style={{ top: "60%", left: "25%" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  
                  {/* Event markers */}
                  <motion.div 
                    className="absolute flex items-center justify-center"
                    style={{ top: "25%", left: "35%" }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                  </motion.div>
                  <motion.div 
                    className="absolute flex items-center justify-center"
                    style={{ top: "55%", left: "65%" }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg" />
                  </motion.div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
                    <div className="text-xs font-medium text-slate-600 mb-2">Demand Level</div>
                    <div className="flex gap-1">
                      <div className="w-6 h-2 bg-blue-500 rounded-sm" />
                      <div className="w-6 h-2 bg-orange-500 rounded-sm" />
                      <div className="w-6 h-2 bg-red-500 rounded-sm" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              The portable restroom market is growing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">$18B</div>
              <div className="text-muted-foreground">Market Size</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">5-7%</div>
              <div className="text-muted-foreground">Annual Growth</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">Zero</div>
              <div className="text-muted-foreground">Forecasting Competitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to optimize deployments</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered tools designed specifically for portable restroom operators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Predictive Heatmaps</h3>
                  <p className="text-muted-foreground">
                    AI-powered demand forecasting 7-14 days ahead. See hotspots before they happen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Event Intelligence</h3>
                  <p className="text-muted-foreground">
                    Automatic detection of concerts, festivals, and construction. Never miss an opportunity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Route Optimization</h3>
                  <p className="text-muted-foreground">
                    Maximize revenue per service trip. Reduce empty miles and wasted time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">Get started in minutes</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Connect", desc: "Define your service area on the map" },
              { step: 2, title: "Analyze", desc: "AI scans events and patterns" },
              { step: 3, title: "Forecast", desc: "Get demand predictions" },
              { step: 4, title: "Optimize", desc: "Deploy units strategically" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to see the future?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join operators who are already optimizing their deployments with PortaCast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Get Early Access <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free during beta
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Radio className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">PortaCast</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Chime Stream B.V. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
