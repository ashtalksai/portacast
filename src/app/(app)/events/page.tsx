"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  List, 
  MapPin, 
  Users,
  Music,
  Building2,
  PartyPopper,
  Truck,
  Filter
} from "lucide-react";

// Mock events data
const mockEvents = [
  { 
    id: 1, 
    name: "Summer Music Festival", 
    type: "festival",
    date: "Jun 15-17, 2024", 
    location: "Central Park", 
    attendance: 50000,
    demand: "high",
    units: 12,
    icon: Music,
  },
  { 
    id: 2, 
    name: "Downtown Construction Project", 
    type: "construction",
    date: "Ongoing (Mar-Aug)", 
    location: "5th Ave & Main St", 
    attendance: 200,
    demand: "medium",
    units: 4,
    icon: Building2,
  },
  { 
    id: 3, 
    name: "Annual Street Fair", 
    type: "festival",
    date: "Jun 20, 2024", 
    location: "Market Street", 
    attendance: 15000,
    demand: "high",
    units: 8,
    icon: PartyPopper,
  },
  { 
    id: 4, 
    name: "Tech Company Picnic", 
    type: "corporate",
    date: "Jun 22, 2024", 
    location: "Riverside Park", 
    attendance: 3000,
    demand: "medium",
    units: 6,
    icon: Building2,
  },
  { 
    id: 5, 
    name: "Food Truck Rally", 
    type: "festival",
    date: "Jun 18-19, 2024", 
    location: "Harbor District", 
    attendance: 8000,
    demand: "medium",
    units: 5,
    icon: Truck,
  },
  { 
    id: 6, 
    name: "Marathon 2024", 
    type: "sports",
    date: "Jun 25, 2024", 
    location: "City-wide route", 
    attendance: 25000,
    demand: "high",
    units: 15,
    icon: Users,
  },
];

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase()) ||
                         event.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || event.demand === filter;
    return matchesSearch && matchesFilter;
  });

  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case "high":
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Medium</Badge>;
      default:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>;
    }
  };

  // Generate mock calendar data
  const currentMonth = new Date();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Track and manage demand-generating events</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Manual Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search events by name or location..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "high" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("high")}
            className={filter === "high" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            High Demand
          </Button>
          <Button 
            variant={filter === "medium" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("medium")}
            className={filter === "medium" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            Medium
          </Button>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <List className="w-4 h-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {view === "list" ? (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No events found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => {
              const Icon = event.icon;
              return (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{event.name}</h3>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          {getDemandBadge(event.demand)}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendance.toLocaleString()} expected
                          </div>
                          <div className="font-medium text-foreground">
                            Recommended: {event.units} units
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Add to Coverage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      ) : (
        /* Calendar View */
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="p-2 min-h-[100px] bg-muted/30 rounded" />
              ))}
              
              {/* Days of the month */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                // Mock: show some events on certain days
                const dayEvents = day === 15 || day === 20 || day === 22 || day === 25;
                const isToday = day === new Date().getDate();
                
                return (
                  <div 
                    key={day} 
                    className={`p-2 min-h-[100px] border rounded transition-colors hover:bg-muted/50 ${
                      isToday ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
                      {day}
                    </div>
                    {dayEvents && (
                      <div className="space-y-1">
                        <div className="text-xs p-1 rounded bg-red-100 text-red-700 truncate">
                          High demand
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
