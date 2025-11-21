import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TakeQuiz from "./pages/TakeQuiz";
import ShowAllResults from "./pages/ShowAllResults";
import { Children } from "react";

function App() {
 const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <TakeQuiz />,
        },
        {
          path: "results",
          element: <ShowAllResults />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
