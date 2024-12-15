import Layout from "@components/layout";
import MainPage from "@pages/index";
import List from "@pages/board/List";
import { createBrowserRouter } from "react-router-dom";
import New from "@pages/board/New";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: ":type", element: <List /> },
      { path: ":type/new", element: <New /> },
    ],
  },
]);

export default router;
