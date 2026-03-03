"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";

// Conditionally import useUser
const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bell, 
  CreditCard, 
  User,
  Save,
  Trash2
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("service-area");
  
  // Mock user data when Clerk is not configured
  const user = {
    fullName: "Demo User",
    primaryEmailAddress: { emailAddress: "demo@example.com" },
  };
  
  // Form states
  const [totalUnits, setTotalUnits] = useState("45");
  const [companyName, setCompanyName] = useState("Acme Restrooms Inc.");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  
  // Notification toggles
  const [notifications, setNotifications] = useState({
    newEvents: true,
    weeklyForecast: true,
    deploymentReminders: false,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="service-area" className="gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Service Area</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        {/* Service Area Tab */}
        <TabsContent value="service-area">
          <Card>
            <CardHeader>
              <CardTitle>Service Area</CardTitle>
              <CardDescription>
                Define your coverage area and unit inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Map placeholder */}
              <div>
                <Label>Coverage Area</Label>
                <div className="mt-2 h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Draw your service area on the map</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Open Map Editor
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Current service area: 45 sq mi
                </p>
              </div>

              <Separator />

              {/* Unit inventory */}
              <div className="space-y-4">
                <Label htmlFor="units">Total Unit Inventory</Label>
                <div className="flex gap-4">
                  <Input 
                    id="units"
                    type="number" 
                    value={totalUnits}
                    onChange={(e) => setTotalUnits(e.target.value)}
                    className="max-w-[200px]"
                  />
                  <span className="text-muted-foreground self-center">portable units</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This helps us calculate optimal deployment recommendations
                </p>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about events and forecasts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { 
                  key: "newEvents", 
                  label: "New high-demand events detected",
                  desc: "Get notified when new events are detected in your service area"
                },
                { 
                  key: "weeklyForecast", 
                  label: "Weekly forecast summary",
                  desc: "Receive a weekly email with demand predictions"
                },
                { 
                  key: "deploymentReminders", 
                  label: "Unit deployment reminders",
                  desc: "Reminders to deploy units before high-demand events"
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof notifications]
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications] 
                        ? "bg-primary" 
                        : "bg-muted"
                    }`}
                  >
                    <div 
                      className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform shadow ${
                        notifications[item.key as keyof typeof notifications] 
                          ? "translate-x-6" 
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email">Notification Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  value={user?.primaryEmailAddress?.emailAddress || ""}
                  disabled
                  className="max-w-md"
                />
                <p className="text-sm text-muted-foreground">
                  This is your account email. Update it in account settings.
                </p>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">Beta Access</div>
                    <div className="text-sm text-muted-foreground">Free during beta period</div>
                  </div>
                  <div className="text-2xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Payment Method</h3>
                <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">No payment method required during beta</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Billing History</h3>
                <p className="text-sm text-muted-foreground">No invoices yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your profile and company details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={user?.fullName || ""}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acc-email">Email</Label>
                  <Input 
                    id="acc-email"
                    type="email"
                    value={user?.primaryEmailAddress?.emailAddress || ""}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div>
                <h3 className="font-medium text-destructive mb-4">Danger Zone</h3>
                <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Delete Account</div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
