//@ts-nocheck
import React, { useState } from 'react';

const Dropdown = ({ label, options, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label className="text-gray-700 mb-1">{label}:</label>
      <div className="relative flex items-center">
        {/* Display the SVG icon as an image if provided */}
        {icon && (
          <img
            src={icon}
            alt=""
            className="absolute left-3 w-5 h-5 pointer-events-none"
          />
        )}
        <select
          className="border border-gray-300 rounded px-10 py-2 w-full appearance-none"
          style={{
            paddingRight: '2.5rem', 
          }} 
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Dynamic dropdown arrow */}
        <span className="absolute right-3 pointer-events-none text-gray-500">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
