import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CityData, dataProps } from "../Interface/CityData";
import { fetchweatherData } from "../redux/WeatherSLice";
import { useNavigate } from "react-router-dom";
import AutoCompleteSearchbar from "./AutoCompleteSearchbar";
import { fetchForecastData } from "../redux/ForecastSlice";

const CityTable: React.FC<dataProps> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState<{ key: keyof CityData | null, direction: string | null }>({ key: null, direction: null });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState({
    genericName: ""
  });

  

  const filteredData = data.filter(city => {
    return city.name.toLowerCase().includes(filters.genericName.toLowerCase());
  });

  const handleClick = (geoname_id: string, lat: number, lon: number): void => {
    localStorage.setItem("latitude", lat.toString());
    localStorage.setItem("longitude", lon.toString());

    dispatch(fetchweatherData({ lat, lon }));
    dispatch(fetchForecastData({ lat, lon }));

    navigate(`/weather/${geoname_id}`);
  };

  const handleSort = (key: keyof CityData) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = filteredData.sort((a: CityData, b: CityData) => {
    if (sortConfig.key) {
      const key = sortConfig.key as keyof CityData;
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full cursor-default">
        <div className="z-40 p-2 bg-white/70 backdrop-blur-sm flex justify-center gap-10 w-full items-center">
          <p className="lg:text-2xl sm:text-lg px-1 text-slate-800 font-bold ">
            Weather Data
          </p>
          <AutoCompleteSearchbar data={data} handleclick={handleClick} />
        </div>
        <div className="normal-case container max-sm:px-2 lg:w-fit max-sm:w-full h-[28rem] overflow-x-auto overflow-y-auto shadow-md rounded-md ">
          <table className="border-collapse table-auto lg:w-full sm:w-full">
            {/* Table header */}
            <thead>
              <tr className="bg-gray-200 sticky w-full top-0">
                <th className="border-b border-slate-200 py-2 w-12">S.no</th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('geoname_id')}>
                  Generic Name
                  {sortConfig.key === 'geoname_id' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('name')}>
                  Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('country_code')}>
                  Country Code
                  {sortConfig.key === 'country_code' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('cou_name_en')}>
                  Country
                  {sortConfig.key === 'cou_name_en' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('population')}>
                  Population
                  {sortConfig.key === 'population' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('timezone')}>
                  Timezone
                  {sortConfig.key === 'timezone' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 cursor-pointer" onClick={() => handleSort('coordinates')}>
                  Latitude, Longitude
                  {sortConfig.key === 'coordinates' && (
                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                  )}
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white text-center">
              {sortedData.map((city: CityData, index) => (
                <tr
                  className="hover:bg-slate-100 active:bg-blue-300 text-sm even:bg-gray-50 odd:bg-white overflow-x-hidden truncatate "
                  key={index}
                  onClick={() => handleClick(city.geoname_id, city.coordinates.lat, city.coordinates.lon)}
                >
                  <td className="border-b border-slate-200 px-2 py-2 w-fit">
                    {index + 1}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.geoname_id}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.name}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.country_code}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.cou_name_en}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.population}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.timezone}
                  </td>
                  <td className="border-b col-span-2 border-slate-200 px-2 py-2 ">
                    {city.coordinates.lat}, &nbsp;
                    {city.coordinates.lon}
                  </td>
                 
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CityTable;
