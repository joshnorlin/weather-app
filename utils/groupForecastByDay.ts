export default function groupForecastByDay(forecastList) {
  // forecastList is apiData.list from OpenWeather's /forecast endpoint
  const grouped = {};
  forecastList.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // "YYYY-MM-DD"
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  // Convert to array of { title, data } for SectionList
  return Object.entries(grouped).map(([date, data]) => ({
    title: date,
    data,
  }));
}