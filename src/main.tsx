import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import App from "./App.tsx";
// import { RecoilRoot } from "recoil";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <RecoilRoot>
//     <App />
//   </RecoilRoot>
// );

const router = createBrowserRouter([
  {
    path: "/kakao-login",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
