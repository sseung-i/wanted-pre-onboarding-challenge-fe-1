import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./pages/components/Nav";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Update from "./pages/Update";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Read />} />
          <Route path={"/:id"} element={<Read />} />
          <Route path={"/detail/create"} element={<Create />} />
          <Route path={"/detail/update/:id"} element={<Update />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
