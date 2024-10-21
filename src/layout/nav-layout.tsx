import { slideNav } from "@/assets/slide-nav";
import { Link } from "react-router-dom";

const NavLayout = () => {
  return (
    <div className=" px-5 space-y-5 mt-5 text-white">
      {slideNav.map((navLink) => (
        <div key={navLink.id}>
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
