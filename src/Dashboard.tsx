import React from "react";
import IconButton from "./components/iconButton";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row items-start place-content-between p-1">
        <h1 className="font-bold text-3xl mb-4">Notes</h1>
        <div className="flex flex-row space-x-4">
          <IconButton icon={FaPlus} bgColor="bg-black" />
          <IconButton
            label="Delete Note"
            icon={FaTrashAlt}
            bgColor="bg-red-600"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
