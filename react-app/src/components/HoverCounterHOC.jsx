import withCounter from "./HOC/withCounter";

const HoverCounterHOC = withCounter(({ counter, handleIncrement }) => {
  return (
    <div>
      <h2>Hover Counter</h2>
      <button onMouseOver={handleIncrement}>Hovered {counter} times</button>
    </div>
  )
});

export default HoverCounterHOC;