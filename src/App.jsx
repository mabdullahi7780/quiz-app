import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TakeQuiz from "./pages/TakeQuiz";
import ShowAllResults from "./pages/ShowAllResults";
import { Children } from "react";
import AddQuiz from "./pages/AddQuiz";
import ManageQuizzes from "./pages/ManageQuizzes";
import EditQuiz from "./pages/EditQuiz";

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
        {
          path: "add-quiz",
          element: <AddQuiz/>,
        },
        {
          path: "manage-quizzes",
          element: <ManageQuizzes/>,
        },
        {
          path: "edit-quiz",
          element: <EditQuiz/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
