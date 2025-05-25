import usStateAbbreviations from '../assets/usStateAbbreviations.json';

export default function parseStateAbbreviations(stateName: string) {
  console.log(stateName);
  console.log(usStateAbbreviations[stateName.trim().toLowerCase()]);
  const id = usStateAbbreviations[stateName.trim().toLowerCase()];
  return id;
}