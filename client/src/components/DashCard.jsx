import React from "react";

const DashCard = ({ title, amount }) => {
  return (
    <div className="dashCardMain">
      <div className=" dashCardTitle flex gap-[6px] items-center text-[#3f3f46]">{title}</div>
      {/* <div className="flex items-center justify-between "> */}
        <div className="dashCardAmount font-[600] text-[28px] ">{amount}</div>
      {/* </div> */}
    </div>
  );
};

export default DashCard;
