import React, { ChangeEvent, useState } from "react";
import { CityData } from "../Interface/CityData";

interface propsValue{
    data:CityData[];
    handleclick: (geoname_id: string) => void; 
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
          placeholder="search"
          className="p-2 mb-1"
          onChange={handlechange}
        />

        {query !== "" && searchResults.length > 0 && (
          <div className="bg-white w-[120px] px-1 h-[120px] absolute overflow-y-scroll">
            {searchResults.map((city) => (
              <div key={city.geoname_id}>
                <p onClick={()=>handleclick(city.geoname_id)}>{city.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AutoCompleteSearchbar;
