function calculateLocalTime(dateString, timezone) {
  const now = new Date(dateString.replace(' ', 'T') + 'Z'); // Assumes UTC
  const utcTime = new Date((now.getTime()) + (now.getTimezoneOffset() * 60 * 1000));
  const cityTime = new Date((utcTime.getTime()) + (timezone * 1000));
  
  /*console.log(
    cityTime.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    cityTime.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );*/

  return (cityTime.getTime());
}


export default function formatForecastList(forecastList, timezoneOffset) {

  const formattedForecastList = forecastList.map((forecast) => {
    return {
      ...forecast,
      dt_txt: calculateLocalTime(forecast.dt_txt, timezoneOffset),
    };
  });
  return formattedForecastList;
}