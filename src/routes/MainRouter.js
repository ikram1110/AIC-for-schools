import { Route, Routes } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import IdentitasSekolah from "../containers/Master/IdentitasSekolah";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/master/identitas-sekolah" element={<IdentitasSekolah />} />
    </Routes>
  );
};
export default MainRouter;
