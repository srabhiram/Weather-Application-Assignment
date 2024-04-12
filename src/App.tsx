import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage.tsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);
  return (
    <>
        <RouterProvider router={router} />

    </>
  );
}

export default App;
