import React, { useEffect, useState } from 'react';
import { weatherProps } from "../Interface/WeatherData";
import gps from "../assets/gps-navigator.png";
import windflow from "../assets/windflow.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import sunrise from "../assets/sunrise.svg";
import sunset from "../assets/sunset.svg";
import fogg from "../assets/fogg.svg";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux";
import Forecast from "./Forecast";
import { fetchweatherData } from '../redux/WeatherSLice';
import { useNavigate } from 'react-router-dom';
import { fetchForecastData } from '../redux/ForecastSlice';
import AutoCompleteSearchbar from './AutoCompleteSearchbar';

const Weather: React.FC<weatherProps> = ({ data, icon,coord }) => {
  const [unit, setUnit] = useState('C'); // Default unit is Celsius
 const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const {lat,lon}=coord;
   
    dispatch(fetchForecastData({lat,lon}));
  
   
  }, [coord,dispatch])
  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchweatherData({ lat: latitude, lon: longitude }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  const convertTemperature = (temp: number, unit: string) => {
    if (unit === 'F') {
      return (temp * 9 / 5) + 32;
    } else if (unit === 'K') {
      return temp + 273.15.toFixed();
    }
    return temp; 
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const dataa = useSelector(
    (state: IRootState) => state?.ForecastSlice?.forecastData
  );
  const cityData = useSelector((state:IRootState)=>state.CitySlice.data)
  const handleClick = (geoname_id: string, lat:number, lon:number): void => {
    dispatch(fetchweatherData({lat,lon}));
    dispatch(fetchForecastData({lat,lon}));

    navigate(`/weather/${geoname_id}`);
  };

  return (
    <>
      <div className="drop-shadow-lg  shadow-2xl border-black cursor-default container mx-auto bg-white/40  flex flex-col justify-center items-center rounded-xl lg:w-1/2 ">
        <div className="flex p-2 relative items-center justify- gap-2 mx-3">
          <div id="search-box">
            <AutoCompleteSearchbar data={cityData} handleclick={handleClick}/>
          </div>{" "}
          <div id="gps">
            <button
              id="current_location"
              className="p-2  static rounded-lg bg-white/80 hover:bg-blue-200 focus:bg-blue-400"
              onClick={()=>fetchData()}
            >
              <img src={gps} alt="GPS" width={22} />
            </button>
          </div>
        </div>

        <div id="info" className="flex justify-around w-full   items-center">
          <img
            src={icon(data.weather[0].id, data.sys.sunrise, data.sys.sunset)}
            alt="Weather Icon"
            width={120}
            className="order-2 "
          />
          <div className="w-1/2 pl-3">
            <h1 id="Location-name" className="normal-case font-thin text-[27px] px-2">
              {data.name}
            </h1>
            <p className="font-thin p-1 text-5xl m-0">
              {convertTemperature(data.main.temp, unit)} {/* Display converted temperature */}
              <sup>°</sup> 
              <select name="temp" className="bg-inherit text-3xl font-medium" value={unit} onChange={handleChange}>
                <option value="C" className="text-sm">C</option>
                <option value="F" className="text-sm">F</option>
                <option value="K" className="text-sm">K</option>
              </select>
            </p>
            <h1 className="capitalize mb-4 font-regular text-xl px-2">
              {data.weather[0].description}
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-700 px-1 text-center ">
          Feels Like: {convertTemperature(data.main.feels_like, unit)} <sup>°</sup>
        </p>
        <div className="lg:flex items-center justify-around truncate overflow-hidden w-full h-full">
          <div className="bg-indigo-100/50 mx-2 my-4 rounded-md place-items-center grid grid-cols-3 gap-4 p-1.5 text-center lg:w-1/2">

            <span className='flex items-center flex-col  hover:bg-blue-200/50 '>{formatTime(data.sys.sunrise)}
            <img src={sunrise} alt="" width={25} />
            Sunrise</span>

            <span className='flex flex-col  hover:bg-blue-200/50  items-center'>{formatTime(data.sys.sunset)}
            <img src={sunset} alt="" width={25}/>
            Sunset</span>

            <span className='flex flex-col  hover:bg-blue-200/50  items-center'>{data.visibility / 1000} Km 
            <img src={fogg} width={25} alt="" />
            Fog</span>
          </div>
          <div className="bg-indigo-100/50 mx-2 my-4 rounded-md truncate  grid grid-cols-3 gap-2 p-1.5 text-center lg:w-1/2">
            <div
              id="wind"
              className="flex flex-col  items-center hover:bg-blue-200/50 focus:bg-blue-400 rounded-sm "
            >
              <span>
                {data.wind.speed} <span className="text-[9px]"> m/sec</span>
              </span>
              <img src={windflow} width={22} alt="Wind" className="py-1" />
              <span>Wind flow</span>
            </div>
            <div
              id="pressure"
              className="flex flex-col items-center hover:bg-blue-200/50 focus:bg-blue-400 rounded-sm"
            >
              <span>
                {data.main.pressure}
                <span className="text-[9px]"> hPa</span>
              </span>
              <img src={pressure} width={21} alt="Pressure" className="py-1" />
              <span>Pressure</span>
            </div>
            <div
              className="flex flex-col items-center hover:bg-blue-200/50 focus:bg-blue-400 rounded-sm"
              id="humidity"
            >
              <span>{data.main.humidity}%</span>
              <img src={humidity} width={22} alt="Humidity" className="py-1" />
              <span>Humidity</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mx-3 px-3 py-2 ">
          <Forecast forecastdata={dataa} icon={icon} />
        </div>
      </div>
    </>
  );
};

export default Weather;
