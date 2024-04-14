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
 const getWeatherIcon = (weatherID: number, sunrise: number, sunset: number): string | undefined => {
  const currentTime = new Date().getTime() / 1000; 
  const timeOfDay = currentTime > sunrise && currentTime < sunset ? 'd' : 'n'; 

  switch (true) {
    case weatherID === 800:
      return timeOfDay === 'd' ? clear_sky_day : clear_sky_night;
    case weatherID === 801:
      return timeOfDay === 'd' ? few_clouds_day : few_clouds_night;
    case weatherID > 801:
      return cloudy;
    case weatherID > 511:
      return timeOfDay === 'd' ? shower_rain_day : shower_rain_night;
    case weatherID >= 300 && weatherID <= 321:
      return timeOfDay === 'd' ? shower_rain_day : shower_rain_night;
    case weatherID >= 500 && weatherID < 520:
      return timeOfDay === 'd' ? rain_day : rain_night;
    case weatherID < 233 && weatherID >= 200:
      return thunder;
    default:
      return undefined;
  }
};
  return (
    <>
      {data ? (
        <>
          <div className="h-screen flex justify-center items-center w-full">
            {" "}
            <Weather data={data} icon={getWeatherIcon} />
          </div>
        </>
      ) : (
        <Spinner loading={loading} />
      )}
    </>
  );
};

export default Weatherpage;
