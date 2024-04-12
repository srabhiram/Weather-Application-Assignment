import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { fetchCityData } from "../redux/CitySlice";
import { CityData } from "../Interface/Types";
import { ClipLoader, ScaleLoader } from "react-spinners";

const Homepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    dispatch(fetchCityData());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="h-screen w-full flex justify-center  items-center mx-auto">
          <ScaleLoader className=" h-28 w-36 border-black" loading={loading} />
        </div>
      </>
    );
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
                  onClick={() => console.log(city.name)}
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
