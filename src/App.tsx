import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage.tsx";
import Weatherpage from "./Weatherpage.tsx";
import ErrorPage from "./Components/ErrorPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      errorElement: <ErrorPage />,
     
    },
    {
      path: "/weather/:geoname_id",
      element: <Weatherpage />,
      errorElement: <ErrorPage />,

    },
    {
      path: "*",
      element: <ErrorPage/>,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
