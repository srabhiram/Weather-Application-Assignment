import clear_sky_day from "../assets/day.svg";
import clear_sky_night from "../assets/night.svg";
import few_clouds_day from "../assets/cloudy-day-1.svg";
import few_clouds_night from "../assets/cloudy-night-1.svg";
import cloudy from "../assets/cloudy.svg";
import shower_rain_night from "../assets/rainy-7.svg";
import shower_rain_day from "../assets/rainy-2.svg";
import rain_day from "../assets/rainy-3.svg";
import rain_night from "../assets/rainy-6.svg";
import thunder from "../assets/thunder.svg";

const getWeatherIcon = (
    weatherIDs: number[] | undefined,
    timeOfDay: string | string[]
  ): (string | undefined)[] => {
    if (!weatherIDs || weatherIDs.length === 0) return [];
  
    return weatherIDs.map((weatherID) => {
      switch (true) {
        case weatherID === 800:
          return timeOfDay === "d" ? clear_sky_day : clear_sky_night;
        case weatherID === 801:
          return timeOfDay === "d" ? few_clouds_day : few_clouds_night;
        case weatherID > 801:
          return cloudy;
        case weatherID > 511:
          return timeOfDay === "d" ? shower_rain_day : shower_rain_night;
        case weatherID >= 300 && weatherID <= 321:
          return timeOfDay === "d" ? shower_rain_day : shower_rain_night;
        case weatherID >= 500 && weatherID < 520:
          return timeOfDay === "d" ? rain_day : rain_night;
        case weatherID < 233 && weatherID >= 200:
          return thunder;
        default:
          return undefined;
      }
    });
  };
  
  export default getWeatherIcon;