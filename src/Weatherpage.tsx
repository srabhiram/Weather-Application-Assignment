import { useSelector } from "react-redux";
import { IRootState } from "./redux";
import Weather from "./Components/Weather";
import Spinner from "./Components/Spinner";
import clear_sky_day from "./assets/day.svg";
import clear_sky_night from "./assets/night.svg";
import few_clouds_day from "./assets/cloudy-day-1.svg";
import few_clouds_night from "./assets/cloudy-night-1.svg";
import cloudy from "./assets/cloudy.svg";
import shower_rain_night from "./assets/rainy-7.svg";
import shower_rain_day from "./assets/rainy-2.svg";
import rain_day from "./assets/rainy-3.svg";
import rain_night from "./assets/rainy-6.svg";
import thunder from "./assets/thunder.svg";

const Weatherpage = () => {
  console.log();
  const data = useSelector(
    (state: IRootState) => state.WeatherSLice.weatherData
  );
  const loading = useSelector(
    (state: IRootState) => state.WeatherSLice.loading
  );
  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
  if (loading) {
    return <Spinner loading={loading} />;
  }
  const currentTime = new Date().getHours(); // Get current hour
  const isDayTime = currentTime >= 6 && currentTime < 18; // Assuming day time is between 6 AM and 6 PM

  let WeatherIcon: string | undefined;

  const weatherID: number  = data ? data?.weather[0].id : 1 ;

  console.log(weatherID);
  switch (true ) {
    case weatherID === 800:
      WeatherIcon = isDayTime ? clear_sky_day : clear_sky_night;
      break;
    case weatherID === 801:
      WeatherIcon = isDayTime ? few_clouds_day : few_clouds_night;
      break;
    case weatherID > 801:
      WeatherIcon = cloudy;
      break;
    case weatherID > 511:
      WeatherIcon = isDayTime ? shower_rain_day : shower_rain_night;
      break;
    case weatherID >= 300 && weatherID <= 321:
      WeatherIcon = isDayTime ? shower_rain_day : shower_rain_night;
      break;
    case weatherID >= 500 && weatherID < 520:
      WeatherIcon = isDayTime ? rain_day : rain_night;
      break;
    case weatherID < 233 && weatherID >= 200:
      WeatherIcon = thunder;
      break;
  }
  return (
    <>
      {data ? (
        <>
          <div className="h-screen flex justify-center items-center w-full">
            {" "}
            <Weather data={data} icon={WeatherIcon} />
          </div>
        </>
      ) : (
        <Spinner loading={loading} />
      )}
    </>
  );
};

export default Weatherpage;
