import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ option, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <button
        className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 mt-2 rounded-md flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? option.find((opt) => opt.value === value)?.label : placeholder}
        <span className="ml-2">
          <LuChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="w-full absolute bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {option.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
