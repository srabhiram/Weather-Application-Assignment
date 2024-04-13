import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "./redux";
import { fetchweatherData } from "./redux/WeatherSLice";
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
  console.log(data)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchweatherData());
  }, [dispatch]);

  if(loading){
    return <Spinner loading={loading}/>
  }

  return (
    <>
     <Weather data = {data} />
    </>
  );
};

export default Weatherpage;
