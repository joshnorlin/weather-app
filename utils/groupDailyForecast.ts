export default function groupDailyForecast(forecastList, timezoneOffsetSeconds) {
  const grouped = {};
  forecastList.forEach(item => {
    const forecastTime = new Date(item.dt_txt);
    const utcForecastTime = new Date(forecastTime.getTime() + forecastTime.getTimezoneOffset() * 60 * 1000);
    //console.log(cityForecastTime);
    // Convert dt_txt to UTC timestamp (ms)
    /*const utcTimestamp = new Date(item.dt_txt).getTime();
    // Convert to city local timestamp (ms)
    const localTimestamp = utcTimestamp + timezoneOffsetSeconds * 1000;
    const localDateObj = new Date(localTimestamp);
    const date = localDateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
    // Attach localHour for later use*/
    const date = utcForecastTime.toISOString().split('T')[0];
    const localHour = utcForecastTime.getHours();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push({ ...item, localHour });
  });

  // For each day, pick the forecast closest to 12:00 local time
  return Object.entries(grouped).map(([date, items]) => {
    const targetHour = 12;
    let closest = items[0];
    let minDiff = Math.abs(items[0].localHour - targetHour);
    items.forEach(item => {
      const diff = Math.abs(item.localHour - targetHour);
      if (diff < minDiff) {
        closest = item;
        minDiff = diff;
      }
    });
    return { date, forecast: closest };
  });
}