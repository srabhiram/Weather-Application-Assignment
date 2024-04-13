import { ScaleLoader } from "react-spinners";
import { loadingProps } from "../Interface/CityData";

const Spinner: React.FC<loadingProps> = ({ loading }) => {
  return (
    <>
      <div className="h-screen w-full flex justify-center  items-center mx-auto">
        <ScaleLoader color="white" loading={loading} />
      </div>
    </>
  );
};

export default Spinner;
