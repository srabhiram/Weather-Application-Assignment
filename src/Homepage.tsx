import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityData } from "./redux/CitySlice";
import { IRootState } from "./redux";
import CityTable from "./Components/CityTable";
import Navbar from "./Components/Navbar";
import Spinner from "./Components/Spinner";

const Homepage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const data = useSelector((state: IRootState) => state.CitySlice.data);
  const loading = useSelector((state: IRootState) => state.CitySlice.loading);

  useEffect(() => {
    dispatch(fetchCityData());
  }, [dispatch]);

  if (loading) {
    return <Spinner loading = {loading}/>
  }

  return (
    <>
      <Navbar />
      <CityTable data={data} loading = {loading}/>
    </>
  );
};

export default Homepage;
