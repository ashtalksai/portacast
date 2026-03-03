"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Cloud,
  ChevronUp,
  ChevronDown,
  Users
} from "lucide-react";

// Mock demand data points for the heatmap
const mockDemandData = [
  { id: 1, lat: 40.7580, lng: -73.9855, intensity: 0.9, name: "Music Festival", date: "Jun 15-17", attendance: 50000 },
  { id: 2, lat: 40.7614, lng: -73.9776, intensity: 0.7, name: "Construction Site", date: "Ongoing", attendance: 200 },
  { id: 3, lat: 40.7484, lng: -73.9857, intensity: 0.8, name: "Street Fair", date: "Jun 20", attendance: 15000 },
  { id: 4, lat: 40.7549, lng: -73.9840, intensity: 0.5, name: "Corporate Event", date: "Jun 22", attendance: 3000 },
  { id: 5, lat: 40.7527, lng: -73.9772, intensity: 0.6, name: "Food Festival", date: "Jun 18-19", attendance: 8000 },
];

// Mock weather data
const mockWeather = {
  temp: 72,
  condition: "Partly Cloudy",
  humidity: 45,
};

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof mockDemandData[0] | null>(null);
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("week");
  const [panelExpanded, setPanelExpanded] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Stats
  const totalUnits = 45;
  const activeEvents = mockDemandData.length;
  const projectedRevenue = 12500;

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 0.8) return "bg-red-500";
    if (intensity >= 0.6) return "bg-orange-500";
    return "bg-blue-500";
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 0.8) return "High";
    if (intensity >= 0.6) return "Medium";
    return "Low";
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Interactive Map Visualization */}
        <div 
          ref={mapRef}
          className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Heatmap blobs */}
          {mockDemandData.map((point, i) => {
            const x = 20 + (i * 15) + (Math.random() * 10);
            const y = 20 + (i * 12) + (Math.random() * 10);
            const size = 80 + (point.intensity * 60);
            
            return (
              <div
                key={point.id}
                className={`absolute rounded-full blur-xl transition-all duration-300 cursor-pointer ${
                  point.intensity >= 0.8 
                    ? "bg-red-500/40" 
                    : point.intensity >= 0.6 
                      ? "bg-orange-500/40" 
                      : "bg-blue-500/30"
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedEvent(point)}
              />
            );
          })}

          {/* Event markers */}
          {mockDemandData.map((point, i) => {
            const x = 20 + (i * 15) + (Math.random() * 10);
            const y = 20 + (i * 12) + (Math.random() * 10);
            
            return (
              <div
                key={`marker-${point.id}`}
                className="absolute cursor-pointer group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedEvent(point)}
              >
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getIntensityColor(point.intensity)} group-hover:scale-125 transition-transform`} />
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white rounded-lg shadow-lg p-2 whitespace-nowrap text-sm">
                    <div className="font-semibold">{point.name}</div>
                    <div className="text-muted-foreground text-xs">{point.date}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="text-sm font-medium mb-3">Demand Level</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Low</span>
              </div>
            </div>
          </div>

          {/* Weather widget */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-primary" />
              <div>
                <div className="font-semibold">{mockWeather.temp}°F</div>
                <div className="text-sm text-muted-foreground">{mockWeather.condition}</div>
              </div>
            </div>
          </div>

          {/* Selected event popup */}
          {selectedEvent && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-80 z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedEvent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEvent.date}</p>
                </div>
                <Badge className={getIntensityColor(selectedEvent.intensity)}>
                  {getIntensityLabel(selectedEvent.intensity)}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Est. Attendance: {selectedEvent.attendance.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Recommended Units: {Math.ceil(selectedEvent.attendance / 100)}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Add to Coverage</Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
              </div>
            </div>
          )}

          {/* Map placeholder message */}
          <div className="absolute top-4 left-4 bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-xs">
            <p className="text-sm text-amber-800">
              <strong>Demo Mode:</strong> Connect Mapbox API for real map visualization
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className={`bg-background border-t transition-all duration-300 ${panelExpanded ? "h-48" : "h-14"}`}>
        {/* Panel toggle */}
        <button
          onClick={() => setPanelExpanded(!panelExpanded)}
          className="w-full h-10 flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          {panelExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {panelExpanded && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              {/* Stats cards */}
              <div className="flex gap-4">
                <Card className="w-40">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{totalUnits}</div>
                        <div className="text-xs text-muted-foreground">Total Units</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-40">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{activeEvents}</div>
                        <div className="text-xs text-muted-foreground">Active Events</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-48">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${projectedRevenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Projected Revenue</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Time range filter */}
              <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">Next 7 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
