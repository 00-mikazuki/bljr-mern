import { memo } from "react";

const Title = () => {
  console.log('Title component rendered');
  return (
    <div>
      <h2>This is the Title component</h2>
    </div>
  );
}

export default memo(Title); // Using memo to prevent unnecessary re-renders