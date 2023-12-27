import React from "react";
import IconButton from "./components/iconButton";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row items-start place-content-between p-1">
        <div className="flex flex-row space-x-4 justify-start">
          <h1 className="font-bold text-3xl mb-4">Notes</h1>
          <IconButton
            icon={FaPlus}
            bgColor="bg-white"
            textColor="black"
            className="border-[1px] border-slate-400"
          />
        </div>
        <IconButton
          label="Delete Note"
          icon={FaTrashAlt}
          bgColor="bg-red-600"
        />
      </div>
    </>
  );
};

export default Dashboard;