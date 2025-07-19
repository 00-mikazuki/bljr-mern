import { memo } from "react";

const Button = ({ handleClick, children }) => {
  console.log(`Button ${children} component rendered`);
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

export default memo(Button); // Using memo to prevent unnecessary re-renders
