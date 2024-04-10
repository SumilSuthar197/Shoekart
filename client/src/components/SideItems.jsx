import { memo } from "react";
import { Link } from "react-router-dom";

const SideItems = ({ iconName, text, to }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <li className="sideItemLink hover:cursor-pointer hover:bg-[#ffffff0d] flex items-center gap-3 px-4 py-2 rounded-md mb-1 text-[14px]">
        <div className="sideItemIcon">{iconName}</div>
        <div className="sideItemName">{text}</div>
      </li>
    </Link>
  );
};

export default memo(SideItems);
