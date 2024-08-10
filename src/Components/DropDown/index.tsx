import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectDropdownProps {
  options: Option[];
  placeholder: string;
  onSelect: (option: Option) => void;
}

const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-64" ref={dropdownRef}>
      <div
        className="border rounded-md p-2 cursor-pointer bg-white flex justify-between items-center"
        onClick={handleToggle}
        style={{ borderColor: "#9E9E9E" }} 
      >
        <img src="/images/Asset/Eye.svg" alt="" />
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="#007BFF"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 flex items-center"
                onClick={() => handleSelect(option)}
              >
                <span className="block truncate">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelectDropdown;
