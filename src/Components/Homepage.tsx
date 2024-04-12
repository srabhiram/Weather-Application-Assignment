import  { useEffect, useState } from "react";
import { CityData } from "../Interface/Types";

const Homepage = () => {
  const [data, setData] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22"
    )
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
      return () => {
        setData([]);
      }
  }, []);

  if (isLoading) {
    return <p className="mx-auto w-full h-screen text-center text-3xl font-bold">Loading...</p>;
  }

  return (
    <>
      <div>
        <div className="">
          <p>Weather Data</p>
        </div>

        <div className="normal-case w-1/2 mx-auto h-[25rem] overflow-x-clip  overflow-y-auto shadow-md rounded-md ">
          <table className=" border-collapse   table-fixed w-full">
            {/* Table header */}
            <thead>
              <tr className="w-max bg-gray-200 px-2 ">
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
              {data.map((city, index) => (
                <tr
                  className="hover:bg-slate-100 even:bg-gray-50 odd:bg-white overflow-x-hidden truncatate "
                  key={index} onClick={()=>console.log(city.name)}
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

export default Homepage;
