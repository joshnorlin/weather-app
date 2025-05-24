import cityDataJSON from '../assets/worldcities.json';

export async function parseUserInput(userInput: string) {
  try {
    if(!userInput) return [];
    const results = cityDataJSON[userInput.trim().toLowerCase()];
    return (results ? results : []); // is results a truthy value?
  } catch (error) {
    console.error(error);
  }
}
