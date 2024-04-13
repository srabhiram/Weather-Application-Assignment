const Navbar = () => {
  return (
    <>
      <div className="p-3 bg-slate-700 mb-9 flex justify-center gap-[15rem] w-full mx-auto items-center font-semibold">
        <p className=" text-2xl p-2 text-gray-100">Weather Data</p>
        <input
          type="search"
          name="Search City"
          className="bg-gray-50 rounded w-1/6 p-1.5 placeholder:pl-2"
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default Navbar;
