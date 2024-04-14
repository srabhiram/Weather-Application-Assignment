import React, { ChangeEvent, useState } from "react";
import { CityData } from "../Interface/CityData";

interface propsValue{
    data:CityData[];
    handleclick: (geoname_id: string,lat:number,lon:number) => void; 
}
const AutoCompleteSearchbar: React.FC<propsValue> = ({ data,handleclick }) => {
  const [query, setquery] = useState("");
  const [searchResults, setSearchResults] = useState<CityData[]>([]);
  const handlechange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setquery(event.target.value);
    setSearchResults(
      data.filter((city) =>
        city.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    console.log(query);
    console.log(searchResults);
  };

  return (
    <>
      <div>
        <input
          type="search"
          placeholder="Search"
          className="p-2 outline-none focus:ring-blue-400 focus:ring-1 w-[13rem] rounded-md"
          onChange={handlechange}
        />

        {query !== "" && searchResults.length > 0 && (
          <div className="bg-white w-[13rem] mt-1 cursor-default  max-h-[120px] min-h-fit  overflow-y-scroll  absolute rounded-md shadow-md ">
            {searchResults.map((city) => (
              <div key={city.geoname_id} className="hover:bg-gray-200 active:bg-blue-300 px-3  py-1" >
                <p  onClick={()=>handleclick(city.geoname_id,city.coordinates.lat,city.coordinates.lon)}>{city.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AutoCompleteSearchbar;
