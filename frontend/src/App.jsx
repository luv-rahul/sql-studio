import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import Assignments from "./components/Assignments";
import AuthContainer from "./components/AuthContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import {ToastContainer} from "react-toastify";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
        path: "/auth",
        element: <AuthContainer />,
      },
      {
        path: "/assignment/practice",
        element: (
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        ),
      },
      {
        path: "/assignment/practice/:id/:slug",
        element: (
          <ProtectedRoute>
            <Body />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
