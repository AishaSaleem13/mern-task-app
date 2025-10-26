import { Route, Routes } from "react-router-dom";
import Home from "../Components/home/home";
import Hero1 from "../Components/form/hero1";
import TodoApp from "../Components/Dashboard/alltasks";


const Routerconfig = () => {
  return (
    <Routes>
      <Route path="/mainpage" element={<Home />} />
      <Route path="/" element={<Hero1 />} />
      <Route path="/alltask" element={<TodoApp/>}/>
    </Routes>
  );
};

export default Routerconfig;
