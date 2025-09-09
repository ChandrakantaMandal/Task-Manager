import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end  mt-6">
        <button className="flex justify-center items-center gap-3 text-[12px] font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-l-lg border border-red-500 cursor-pointer" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
