import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import Assignments from "./components/Assignments";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/assignment/practice",
        element: <Assignments />,
      },
      {
        path: "/assignment/practice/:id/:slug",
        element: <Body />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
