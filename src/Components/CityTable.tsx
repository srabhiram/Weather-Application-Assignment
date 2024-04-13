import { useDispatch } from "react-redux";
import { CityData, dataProps } from "../Interface/CityData";
import { fetchweatherData } from "../redux/WeatherSLice";
import { useNavigate } from "react-router-dom";
import AutoCompleteSearchbar from "./AutoCompleteSearchbar";

const CityTable: React.FC<dataProps> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleClick = (geoname_id: string): void => {
    dispatch(fetchweatherData(geoname_id));
   
   navigate(`/weather/${geoname_id}`);
    console.log(geoname_id);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full cursor-default">
        <div className=" z-40 p-2 bg-white/70 backdrop-blur-sm flex justify-center gap-10 w-full items-center">
          <p className=" lg:text-2xl sm:text-lg  px-1 text-slate-800 font-bold ">
            Weather Data
          </p>
          <AutoCompleteSearchbar data={data} handleclick={handleClick} />
        </div>
        <div className=" normal-case container max-sm:px-2 lg:w-fit max-sm:w-full h-[28rem] overflow-x-auto  overflow-y-auto shadow-md rounded-md ">
          <table className=" border-collapse    table-auto lg:w-full sm:w-full">
            {/* Table header */}
            <thead>
              <tr className=" bg-gray-200 sticky w-full top-0">
                <th className="border-b border-slate-200  py-2 w-12">S.no</th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32">
                  Generic Name
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32">
                  Name
                </th>

                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32">
                  Country
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32">
                  Country Code
                </th>
                <th className="border-b border-slate-200 px-2 text-sm py-2 w-32 overflow-clip">
                  Time Zone
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white text-center">
              {data.map((city: CityData, index) => (
                <tr
                  className="hover:bg-slate-100 active:bg-blue-300 text-sm even:bg-gray-50 odd:bg-white overflow-x-hidden truncatate "
                  key={index}
                  onClick={() => handleClick(city.geoname_id)}
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
                    {city.cou_name_en}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.country_code}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.timezone}
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
