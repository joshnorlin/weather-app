export default function groupForecastByDay(forecastList: any[]) {
  // Group forecasts by local date (YYYY-MM-DD)
  const groups: { [date: string]: any[] } = {};
  forecastList.forEach(item => {
    // dt_txt is already ms in city local time
    const dateObj = new Date(item.dt_txt);
    const dateStr = getLocalDateKey(dateObj);
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(item);
  });

  // Get today's date in city local time (using the first forecast as reference)
  let todayStr = '';
  if (forecastList.length > 0) {
    todayStr = getLocalDateKey(new Date(forecastList[0].dt_txt));
  }

  // Only include "today" if there are entries for today
  return Object.entries(groups)
    .filter(([date]) => date !== todayStr || groups[date].length > 0)
    .map(([date, forecasts]) => ({ date, forecasts }));
}

function getLocalDateKey(date: Date): string {
  // Returns "YYYY-MM-DD" in the device's local time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}