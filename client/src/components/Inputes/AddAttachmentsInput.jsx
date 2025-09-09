import React, { useState } from "react";
import { MiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  //function to handle option adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  //functon to handle delete an option
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((items, index) => {
        <div
          key={items}
          className="flex justify-between bg-gray-50  border border-gray-100 py-2 px-3 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <LuPaperclip className=" text-gray-400" />
            <p className="text-xs text-black">{items}</p>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      })}
      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex gap-3 border border-gray-100 px-2 rounded-md">
          <LuPaperclip className=" text-gray-400" />
          <input
            type="text"
            placeholder="Add File link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
          />
        </div>
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <MiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
