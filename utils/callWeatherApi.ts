export async function callWeatherApi(cityData) {

  console.log("callWeatherApi: ", cityData);
  console.log("latitude: ", cityData.lat);

  const lat = cityData.lat;
  const lon = cityData.lng;
  const apiKey = "64dd29ae64329d866cdac373ca28f5fc";
  const units = "imperial";
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
    );
    console.log("response: ", response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}