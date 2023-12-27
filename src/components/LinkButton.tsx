import { ReactElement } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  icon: ReactElement;
  label: string;
}

export function LinkButton({ to, icon, label }: LinkButtonProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  const textColor = isActive ? "text-black" : "text-gray-300";
  const hover = isActive ? "" : "group-hover:text-black";
  return (
    <Link
      to={to}
      className={`flex flex-row items-center group p-2 rounded-lg ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      {React.cloneElement(icon, {
        className: `ml-2 ${textColor} ${hover} ${
          isActive ? "" : "transition-all"
        }`,
      })}
      <p
        className={`ml-2 ${textColor} ${hover} ${
          isActive ? "" : "transition-all"
        }`}
      >
        {label}
      </p>
    </Link>
  );
}
