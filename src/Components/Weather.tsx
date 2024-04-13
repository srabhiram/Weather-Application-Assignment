import { weatherProps } from "../Interface/WeatherData";

const Weather: React.FC<weatherProps> = ({ data }) => {
  return (
    <>
      <div className="drop-shadow-lg  shadow-2xl border-black cursor-default container mx-auto bg-white/40  flex flex-col justify-center items-center rounded-xl">
        <div className="flex p-2 relative items-center justify- gap-2 mx-3">
          {/* <div id="search-box">
            <input
              type="text"
              name="city"
              placeholder="Enter City name"
              className="w-full h-full bg-white/80 p-3 text-lg rounded-lg mt-3 outline-none border-none focus:outline-2 focus:outline-black/20 focus:ring-2 focus:ring-gray-outline-black/20 focus:border-2 focus:border-gray-outline-black/20 "
              onChange={(event) => props.setCity(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  props.handlesearch(event.target.value);
                }
              }}
            />
            <div className="p-2" id="search-icon">
              <img
                className="absolute right-[72px]   top-8   opacity-40  text-center"
                src={props.search}
                width={24}
              />
            </div>{" "}
          </div>{" "} */}
          {/* <div id="gps">
            <button
              id="current_location"
              className="p-2  static rounded-lg bg-white/80 hover:bg-blue-200 focus:bg-blue-400"
              onClick={props.click}
            >
              <img src={props.gps} alt="gps" width={22} />
            </button>
          </div> */}
        </div>

        <div id="info" className="flex flex-col gap-1 items-center">
          <h1
            id="Location-name"
            className=" normal-case font-thin text-[27px] px-2"
          >
            {data.name}
          </h1>
          <p className="font-thin p-1 text-5xl m-0">
            {data.main.temp}
            {typeof data.main.temp === "number" ? <sup>°</sup> : <span> </span>}
          </p>
          <h1 className="capitalize mb-4 font-regular text-xl px-2">
            {data.weather[0].description}
          </h1>
        </div>

        <div className="bg-indigo-100/50 mx-2 my-4 rounded-md  grid grid-cols-3 gap-4 p-1.5 text-center">
          <div
            id="wind"
            className="flex flex-col items-center hover:bg-blue-200/50 focus:bg-blue-400 rounded-sm "
          >
            <span>
              {data.wind.speed} <span className="text-[9px]"> m/sec</span>
            </span>
            <img width={22} alt="weather" className="py-1" />
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
            <img width={21} alt="weather" className="py-1" />
            <span>Pressure</span>
          </div>

          <div
            className="flex flex-col items-center hover:bg-blue-200/50 focus:bg-blue-400 rounded-sm"
            id="humidity"
          >
            <span>{data.main.humidity}%</span>
            <img width={22} alt="weather" className="py-1" />
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
