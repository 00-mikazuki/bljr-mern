import { useState } from "react";

const withCounter = (Component) => {
  const NewComponent = () => {
    const [counter, setCounter] = useState(0);
    
    const handleIncrement = () => {
      setCounter(counter + 1);
    }

    return (
      <Component counter={counter} handleIncrement={handleIncrement} />
    )
  }

  return NewComponent;
}

export default withCounter;