import { Route, Routes } from "react-router-dom";
import Home from "../Components/home/home";
import Hero1 from "../Components/form/hero1";

const Routerconfig = () => {
  return (
    <Routes>
      <Route path="/mainpage" element={<Home />} />
      <Route path="/" element={<Hero1 />} />
    </Routes>
  );
};

export default Routerconfig;
