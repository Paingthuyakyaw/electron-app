import { Outlet } from "react-router-dom";
import NavLayout from "./nav-layout";
import capella from "../../public/capella-os.png";
import { useState } from "react";

export interface tabProp {
  id: number;
  name: string;
  link: string;
  icon: JSX.Element;
}

const AppLayout = () => {
  const [tabs, setTabs] = useState<tabProp[]>([]);
  console.log(tabs);

  return (
    <div className=" bg-capellaBlack">
      <div className=" flex items-center gap-2 py-2 px-3">
        <img src={capella} alt="capella" className=" w-10 h-10 " />
        <h2 className=" font-bold text-white">Grumman Holdings</h2>
      </div>
      <div className=" flex ">
        {/* nav slide bar */}
        <div className=" w-[250px] ">
          <NavLayout setTabs={setTabs} />
        </div>
        {/* children  */}
        <div className=" mt-5 w-full">
          <div className=" h-screen w-full bg-[#252930] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
