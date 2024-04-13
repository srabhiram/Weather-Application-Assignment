import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage.tsx";
import Weatherpage from "./Weatherpage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/weather",
      element: <Weatherpage/>,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
