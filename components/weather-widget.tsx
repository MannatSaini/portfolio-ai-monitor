"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
  getCurrentLocation,
  getWeatherByLocation,
  getWeatherByCity,
  celsiusToFahrenheit,
  formatDay,
  getWeatherIcon,
  getWeatherBackground,
  defaultCities,
  type WeatherData,
  type GeoLocation,
} from "../lib/weather-service"
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  RefreshCw,
  AlertCircle,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Search,
  X,
  Info,
} from "lucide-react"

interface WeatherWidgetProps {
  className?: string
  defaultUnit?: "celsius" | "fahrenheit"
  showForecast?: boolean
  compact?: boolean
  defaultCity?: string
}

export function WeatherWidget({
  className = "",
  defaultUnit = "celsius",
  showForecast = true,
  compact = false,
  defaultCity = "New York",
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">(defaultUnit)
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [cityInput, setCityInput] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [suggestedCities, setSuggestedCities] = useState<string[]>([])
  const [apiKeyMissing, setApiKeyMissing] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const fetchWeatherByLocation = async (loc?: GeoLocation) => {
    setLoading(true)
    setError(null)
    setApiKeyMissing(false)

    try {
      // Use provided location or get current location
      const userLocation = loc || (await getCurrentLocation())
      setLocation(userLocation)

      const weatherData = await getWeatherByLocation(userLocation)
      setWeather(weatherData)
    } catch (err) {
      console.error("Error fetching weather:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data"

      if (errorMessage.includes("API key")) {
        setApiKeyMissing(true)
      }

      setError(errorMessage)

      // If there's a default city provided, try to use that
      if (defaultCity) {
        fetchWeatherByCity(defaultCity)
      } else {
        // Otherwise show some random suggested cities
        const randomCities = [...defaultCities].sort(() => 0.5 - Math.random()).slice(0, 3)
        setSuggestedCities(randomCities)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByCity = async (city: string) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    setApiKeyMissing(false)
    setShowSearch(false)

    try {
      const weatherData = await getWeatherByCity(city)
      setWeather(weatherData)
      setLocation({ lat: weatherData.location.lat, lon: weatherData.location.lon })
    } catch (err) {
      console.error("Error fetching weather for city:", err)
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch weather data for ${city}`

      if (errorMessage.includes("API key")) {
        setApiKeyMissing(true)
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (defaultCity) {
      fetchWeatherByCity(defaultCity)
    } else {
      fetchWeatherByLocation()
    }
  }, [defaultCity])

  // Focus the search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  const handleRefresh = () => {
    if (weather?.location?.name) {
      fetchWeatherByCity(weather.location.name)
    } else if (location) {
      fetchWeatherByLocation(location)
    } else {
      fetchWeatherByLocation()
    }
  }

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeatherByCity(cityInput)
  }

  const formatTemp = (temp: number) => {
    const temperature = unit === "celsius" ? temp : celsiusToFahrenheit(temp)
    return `${Math.round(temperature)}°${unit === "celsius" ? "C" : "F"}`
  }

  const getWeatherIcon2 = (weatherId: number) => {
    // Return appropriate Lucide icon based on weather condition
    if (weatherId >= 200 && weatherId < 300) {
      return <CloudLightning className="h-8 w-8 text-white" />
    } else if (weatherId >= 300 && weatherId < 600) {
      return <CloudRain className="h-8 w-8 text-white" />
    } else if (weatherId >= 600 && weatherId < 700) {
      return <CloudSnow className="h-8 w-8 text-white" />
    } else if (weatherId >= 700 && weatherId < 800) {
      return <CloudFog className="h-8 w-8 text-white" />
    } else if (weatherId === 800) {
      return <Sun className="h-8 w-8 text-white" />
    } else if (weatherId > 800) {
      return <Cloud className="h-8 w-8 text-white" />
    }
    return <Sun className="h-8 w-8 text-white" />
  }

  // Render location search UI
  const renderLocationSearch = () => (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Enter Location</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowSearch(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleCitySearch} className="flex gap-2">
        <Input
          ref={searchInputRef}
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name..."
          className="h-8"
        />
        <Button type="submit" size="sm" className="h-8">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )

  // Render suggested cities
  const renderSuggestedCities = () => (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Suggested locations:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestedCities.map((city) => (
          <Button key={city} variant="outline" size="sm" onClick={() => fetchWeatherByCity(city)}>
            {city}
          </Button>
        ))}
      </div>
    </div>
  )

  // Render API key missing message
  const renderApiKeyMissing = () => (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
      <div className="flex items-start gap-2">
        <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800">OpenWeather API Key Missing</h3>
          <p className="text-sm text-amber-700 mt-1">
            The weather widget is currently using mock data because the OpenWeather API key is missing or invalid.
          </p>
          <p className="text-sm text-amber-700 mt-2">
            To use real weather data, please add your OpenWeather API key to the environment variables.
          </p>
        </div>
      </div>
    </div>
  )

  if (compact) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        {apiKeyMissing && !compact && renderApiKeyMissing()}

        {loading ? (
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </CardContent>
        ) : error && !weather ? (
          <CardContent className="p-4">
            <div className="flex items-center text-red-500 mb-2">
              <AlertCircle className="mr-2 h-5 w-5" />
              <span className="text-sm">Location unavailable</span>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => setShowSearch(true)}>
              <MapPin className="h-4 w-4 mr-2" />
              Enter location
            </Button>

            {showSearch && renderLocationSearch()}
            {suggestedCities.length > 0 && renderSuggestedCities()}
          </CardContent>
        ) : weather ? (
          <div className={`${getWeatherBackground(weather.current.weather.id)} text-white`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-medium">{weather.location.name}</span>
                  </div>
                  <div className="text-2xl font-bold">{formatTemp(weather.current.temp)}</div>
                  <div className="text-sm opacity-90">{weather.current.weather.description}</div>
                </div>
                <div className="flex flex-col items-end">
                  {getWeatherIcon2(weather.current.weather.id)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 h-6 mt-1 px-1"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="h-3 w-3 mr-1" />
                    <span className="text-xs">Change</span>
                  </Button>
                </div>
              </div>

              {showSearch && (
                <div className="mt-2 bg-white/10 backdrop-blur-sm rounded p-2">{renderLocationSearch()}</div>
              )}
            </CardContent>
          </div>
        ) : null}
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      {apiKeyMissing && renderApiKeyMissing()}

      {loading ? (
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-16 w-[120px]" />
            <Skeleton className="h-4 w-[150px]" />
            <div className="flex justify-between mt-6">
              <Skeleton className="h-20 w-14" />
              <Skeleton className="h-20 w-14" />
              <Skeleton className="h-20 w-14" />
              <Skeleton className="h-20 w-14" />
              <Skeleton className="h-20 w-14" />
            </div>
          </div>
        </CardContent>
      ) : error && !weather ? (
        <CardContent className="p-6">
          <div className="text-center py-4">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Weather Unavailable</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => setShowSearch(true)} variant="outline" className="mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              Enter Location Manually
            </Button>

            {showSearch && renderLocationSearch()}
            {suggestedCities.length > 0 && renderSuggestedCities()}
          </div>
        </CardContent>
      ) : weather ? (
        <>
          <div className={`${getWeatherBackground(weather.current.weather.id)} p-6 text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <h3 className="text-xl font-medium">
                    {weather.location.name}, {weather.location.country}
                  </h3>
                </div>
                <div className="text-5xl font-bold mt-2">{formatTemp(weather.current.temp)}</div>
                <div className="flex items-center mt-1">
                  <img
                    src={getWeatherIcon(weather.current.weather.icon) || "/placeholder.svg"}
                    alt={weather.current.weather.description}
                    className="w-10 h-10 -ml-2 -my-2"
                  />
                  <span className="capitalize">{weather.current.weather.description}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleRefresh}>
                  <RefreshCw className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-4 w-4 mr-1" />
                  Change Location
                </Button>
              </div>
            </div>

            {showSearch && (
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded p-3">{renderLocationSearch()}</div>
            )}

            <div className="flex justify-between mt-4 text-sm">
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 mr-1" />
                <span>Feels like: {formatTemp(weather.current.feels_like)}</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-1" />
                <span>Humidity: {weather.current.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="h-4 w-4 mr-1" />
                <span>Wind: {Math.round(weather.current.wind_speed * 3.6)} km/h</span>
              </div>
            </div>
          </div>

          {showForecast && (
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">5-Day Forecast</h4>
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={unit === "celsius" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none h-7 px-2"
                    onClick={() => setUnit("celsius")}
                  >
                    °C
                  </Button>
                  <Button
                    variant={unit === "fahrenheit" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none h-7 px-2"
                    onClick={() => setUnit("fahrenheit")}
                  >
                    °F
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center">
                {weather.forecast.map((day) => (
                  <div key={day.dt} className="flex flex-col items-center">
                    <div className="font-medium">{formatDay(day.dt)}</div>
                    <img
                      src={getWeatherIcon(day.weather.icon) || "/placeholder.svg"}
                      alt={day.weather.description}
                      className="w-10 h-10"
                    />
                    <div className="text-sm">
                      <span className="font-medium">{formatTemp(day.temp.max)}</span>
                      {" / "}
                      <span className="text-muted-foreground">{formatTemp(day.temp.min)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </>
      ) : null}
    </Card>
  )
}
