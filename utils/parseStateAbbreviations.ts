import usStateAbbreviations from '../assets/usStateAbbreviations.json';

export default function parseStateAbbreviations(stateName: string) {
  const id = usStateAbbreviations[stateName.trim().toLowerCase()];
  return id;
}