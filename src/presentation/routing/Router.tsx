import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Routes } from "./routes";

const RouteObjects: Array<RouteObject> = Object.values(Routes).map((e) => ({
  path: e.path,
  element: (
    <e.layout>
      <Outlet />
    </e.layout>
  ),
  children: Object.values(e.routes).map((r) => ({
    path: r.path,
    element: <r.element />,
  })),
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Outlet />
        {/* <Providers>
          <Outlet />
        </Providers> */}
      </div>
    ),
    children: [
      ...RouteObjects,
      // {
      //   path: "*",
      //   element: <PageNotFound />,
      // },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
