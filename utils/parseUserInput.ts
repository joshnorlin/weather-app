import Papa from 'papaparse';

export async function parseUserInput(userInput: string) {

  try {
    const csvUrl = 'https://raw.githubusercontent.com/joshnorlin/weather-app/refs/heads/main/assets/worldcities%5B1%5D.csv';
    const csvResult = await fetch(csvUrl);

    const csvString = await csvResult.text();
    const parsed = Papa.parse(csvString, { header: true });
    const cities = parsed.data as any[];

    // Find city (case-insensitive match)
    const cityData = cities.find(
      (city) => city.city_ascii?.toLowerCase() === userInput.trim().toLowerCase()
    );

    console.log("parseUserInput: ", cityData);

    return cityData;

    } catch (error) {
    console.error(error);
  }
}
