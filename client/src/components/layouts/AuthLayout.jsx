import React from "react";

const Authlayout = ({ children }) => {
  return (
    <div className="flex object-cover">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 pt-8">
        <img className="w-64 lg:w-[90%] max-w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default Authlayout;
