import cityDataJSON from '../assets/worldcities.json';

export default async function parseUserInput(userInput: string) {
  try {
    if(!userInput) return [];
    const results = cityDataJSON[userInput.trim().toLowerCase()];
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
