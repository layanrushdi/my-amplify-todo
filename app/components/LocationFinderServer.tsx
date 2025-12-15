export default async function LocationFinderServer() {
  // location (server-side)
  const locationResponse = await fetch("https://apip.cc/json", {
    cache: "no-store",
  });
  const locationData = await locationResponse.json();

  // weather from 7Timer
  const weatherResponse = await fetch(
    `https://www.7timer.info/bin/astro.php?lon=${locationData.Longitude}&lat=${locationData.Latitude}&unit=metric&output=json`,
    { cache: "no-store" }
  );
  const weatherData = await weatherResponse.json();

  const temperature = weatherData.dataseries[0].temp2m;

  return (
    <>
      <h1>Hello from {locationData.City} - server</h1>
      <p>🌡️ Current temperature: {temperature}°C</p>
    </>
  );
}
