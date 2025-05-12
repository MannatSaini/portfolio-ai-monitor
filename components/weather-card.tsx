"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, MapPin } from "lucide-react";
import {
  getCurrentLocation,
  getWeatherByLocation,
  getWeatherBackground,
  getWeatherIcon,
} from "@/lib/weather-service";

// Define a TypeScript interface for weather data
interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp: number;
    weather: {
      id: number;
      description: string;
      icon: string;
    };
  };
}

export function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const location = await getCurrentLocation();
        const weatherData = await getWeatherByLocation(location);
        setWeather(weatherData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load weather. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center text-red-500">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="overflow-hidden">
      <div
        className={`${
          getWeatherBackground(weather.current.weather.id) || "bg-gray-200"
        } text-white`}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="font-medium">{weather.location.name}</span>
              </div>
              <div className="text-2xl font-bold">
                {Math.round(weather.current.temp)}°C
              </div>
              <div className="text-sm opacity-90">
                {weather.current.weather.description}
              </div>
            </div>
            <div>
              <img
                src={
                  getWeatherIcon(weather.current.weather.icon) ||
                  "/placeholder.svg"
                }
                alt={weather.current.weather.description || "Weather icon"}
                className="w-12 h-12"
              />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}