import { useSelector } from "react-redux";
import { IRootState } from "./redux";
import Weather from "./Components/Weather";
import Spinner from "./Components/Spinner";

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

  return <>{data ? <Weather data={data} /> : <Spinner loading={loading} />}</>;
};

export default Weatherpage;
