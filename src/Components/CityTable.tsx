import { useDispatch } from "react-redux";
import { CityData, dataProps } from "../Interface/CityData";
import { fetchweatherData } from "../redux/WeatherSLice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import AutoCompleteSearchbar from "./AutoCompleteSearchbar";

const CityTable: React.FC<dataProps> = ({ data, loading }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleClick = (geoname_id: string):void => {
    dispatch(fetchweatherData(geoname_id));
    setTimeout(() => {
      <Spinner loading={loading} />;
    }, 1500);
    navigate(`/weather/${geoname_id}`);
    console.log(geoname_id);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="relative z-40 p-3 bg-white/70 backdrop-blur-sm flex justify-center gap-[10rem] w-full mx-auto items-center">
          <p className=" text-xl px-1 text-slate-800 font-bold ">Weather Data</p>
          <AutoCompleteSearchbar data= {data}  handleclick = {handleClick}/>
        </div>
        <div className=" normal-case container max-sm:px-2 lg:w-2/3 max-sm:w-full h-[28rem] overflow-x-auto  overflow-y-auto shadow-md rounded-md ">
          <table className=" border-collapse    table-fixed lg:w-full sm:w-auto">
            {/* Table header */}
            <thead>
              <tr className="w-max bg-gray-200 px-2 sticky top-0">
                <th className="border-b border-slate-200 px-2 py-2 w-12">
                  S.no
                </th>
                <th className="border-b border-slate-200 px-2 py-2">
                  Generic Name
                </th>
                <th className="border-b border-slate-200 px-2 py-2">Name</th>
                <th className="border-b border-slate-200 px-2 py-2">
                  Country Code
                </th>
                <th className="border-b border-slate-200 px-2 py-2">Country</th>
                <th className="border-b border-slate-200 px-2 py-2">
                  Time Zone
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white text-center">
              {data.map((city: CityData, index) => (
                <tr
                  className="hover:bg-slate-100 even:bg-gray-50 odd:bg-white overflow-x-hidden truncatate "
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
                    {city.country_code}
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 ">
                    {city.cou_name_en}
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
