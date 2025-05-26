export default async function callWeatherApi(cityData) {
  const lat = cityData.lat;
  const lon = cityData.lng;
  const apiKey = "64dd29ae64329d866cdac373ca28f5fc";
  const units = "imperial";
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
