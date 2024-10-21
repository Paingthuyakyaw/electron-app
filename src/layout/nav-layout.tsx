import { slideNav } from "@/assets/slide-nav";
import { Link } from "react-router-dom";
import { tabProp } from "./app-layout";

interface dataProp {
  setTabs: React.Dispatch<React.SetStateAction<tabProp[]>>;
}

const NavLayout = ({ setTabs }: dataProp) => {
  const handleTab = (id: number) => {
    const filterData = slideNav.filter((nav) => nav.id === id);
    setTabs((prev) =>
      prev.some((tab) => tab.id === id) ? prev : [...prev, ...filterData]
    );
  };

  return (
    <div className=" px-5 space-y-5 mt-5 text-white">
      {slideNav.map((navLink) => (
        <div onClick={() => handleTab(navLink.id)} key={navLink.id}>
          <Link
            className=" transition-all duration-200 hover:bg-capellaGray py-3 px-2 rounded-md flex items-center gap-2"
            to={navLink.link}
          >
            {navLink.icon}
            <span>{navLink.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLayout;
