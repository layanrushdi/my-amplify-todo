"use client";

import { useEffect, useState } from "react";

type LocationInfo = {
  City: string;
  Latitude: number;
  Longitude: number;
};

export default function LocationFinderClient() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  const getLocationAndWeather = async () => {

    const locationResponse = await fetch("https://apip.cc/json");
    const locationData = await locationResponse.json();
    setLocationInfo(locationData);

    const weatherResponse = await fetch(
      `https://www.7timer.info/bin/astro.php?lon=${locationData.Longitude}&lat=${locationData.Latitude}&unit=metric&output=json`
    );
    const weatherData = await weatherResponse.json();

    // Current temperature
    setTemperature(weatherData.dataseries[0].temp2m);
  };

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  if (!locationInfo) return <p>Loading location...</p>;

  return (
    <>
      <h1>Hello from {locationInfo.City} - client</h1>
      <p>🌡️ Current temperature: {temperature}°C</p>
    </>
  );
}
