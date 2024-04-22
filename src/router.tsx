import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import Home from "./pages/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PersistLogin />}>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<AuthWrapper />}>
          <Route path="projects" element={<div>Projects</div>} />
        </Route>
      </Route>
    </Route>
  )
);
