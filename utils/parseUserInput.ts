import Papa from 'papaparse';

type userInput = {
  text: string;
};

export async function parseUserInput(input: userInput) {
    try {
        const csvUrl = 'https://raw.githubusercontent.com/joshnorlin/weather-app/refs/heads/main/assets/worldcities%5B1%5D.csv';
        const csvResult = await fetch(csvUrl);
    if (!csvResult.ok) {
      console.log('Error loading CSV data');
      return;
    }

    const csvString = await csvResult.text();
    // Use PapaParse to parse the CSV string
    const parsed = Papa.parse(csvString, { header: true });
    // Extract data from parsed CSV
    const cities = parsed.data as any[];

    // Find city (case-insensitive match)
    const cityData = cities.find(
      (city) => city.city_ascii?.toLowerCase() === input.text.trim().toLowerCase()
    );

    if (!cityData) {
      console.log('Error parsing CSV data');
      return;
    }

    return cityData;

    } catch (error) {
    console.error(error);
  }
}
