//@ts-nocheck
import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, children, className, icon }) => {
  return (
    <button
      className={`flex items-center py-2 px-4 rounded-[4px] text-[14px] border-2 border-[#E0E0E0] bg-[--primary-button] text-[#212121] ${className}`}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="" className="mr-2 w-5 h-5" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  icon: null,
};

export default Button;
