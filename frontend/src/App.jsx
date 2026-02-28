import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./components/layout/Body";
import Hero from "./components/layout/Hero";
import Assignments from "./features/dashboard/Assignments";
import AuthContainer from "./features/auth/AuthContainer";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./components/layout/ErrorPage";

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
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
