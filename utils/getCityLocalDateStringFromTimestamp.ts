export default function getCityLocalDateStringFromTimestamp(dt_txt: string, timezoneOffsetSeconds: number) {
  const utcTimestamp = new Date(dt_txt).getTime();
  const localTimestamp = utcTimestamp + timezoneOffsetSeconds * 1000;
  const localDateObj = new Date(localTimestamp);
  return localDateObj.toISOString().split('T')[0];
}