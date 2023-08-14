// import logo from './logo.svg';
import "./App.css";
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Error from "./components/Error.jsx";
import RootLayout from "./components/RootLayout";
import NewGoal from "./components/NewGoal.jsx";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { StoreContextProvider } from "./context/StoreContext";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/Login" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/Home/new-goal" element={<NewGoal />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

//   [
//   {
//     path: "/",
//     element: <Navigate to="/Login" />,
//   },
//   { path: "/Login", element: <Login /> },
//   { path: "/SignUp", element: <SignUp /> },
//   {
//     path: "/Home",
//     element: (
//       <ProtectedRoute>
//         <RootLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index, element: <Home /> },
//     ]
//   },
//   { path: "*", element: <Error /> },
// ]);

function App() {
  return (
    <div>
      <AuthContextProvider>
        <StoreContextProvider>
          <RouterProvider router={router} />
        </StoreContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
