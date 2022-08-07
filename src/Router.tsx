import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/components/Create";
import Modify from "./pages/components/Modify";
import Nav from "./pages/components/Nav";
import Read from "./pages/components/Read";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Main />} />
          <Route path={"/detail/:id"} element={<Read />} />
          <Route path={"/detail/create"} element={<Create />} />
          <Route path={"/detail/modify/:id"} element={<Modify />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
