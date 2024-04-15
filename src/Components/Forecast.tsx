import { forecastProps } from "../Interface/ForecastData";
import getWeatherIcon from "./IconLogic";

const getDayLabel = (date: Date): string => {

  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString(undefined, { weekday: "short" });
  }
};

const getTimeLabel = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const Forecast: React.FC<forecastProps> = ({ forecastdata }) => {
  const weatherIDs = forecastdata?.list?.map((weather) =>
    weather?.weather.map((id) => id?.id)
  );
  const timeOfDay = forecastdata?.list?.map((weather) => weather?.sys?.pod);

  // Flatten the 2D array
  const flattenedWeatherIDs = weatherIDs?.flat();

  //  timeOfDay is an array
  const timeOfDayArray = Array.isArray(timeOfDay) ? timeOfDay : [];

  //  weatherIcons is an array
  const weatherIcons =
    Array.isArray(flattenedWeatherIDs) &&
    timeOfDayArray.length === flattenedWeatherIDs.length
      ? getWeatherIcon(flattenedWeatherIDs, timeOfDayArray)
      : [];

  const temperatures = forecastdata?.list?.map((item) => item.main.temp) || [];

  return (
    <div className="w-full">
      {forecastdata ? (
        <div className="flex px-2 gap-2 bg-white/30 rounded-sm overflow-x-auto w-full h-fit">
          {forecastdata.list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-4  py-2 border-r items-center w-full gap-2"
            >
              <p className="font-semibold">{getDayLabel(new Date(item.dt_txt))}</p>
              <img
                src={weatherIcons && weatherIcons[index]}
                alt=""
                className="w-10"
              />{" "}
              <p className="truncate">{getTimeLabel(new Date(item.dt_txt))}</p>
              <p>{temperatures[index]}<sup>°</sup>c</p>
              <p className="capitalize text-sm truncate">{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Forecast;
