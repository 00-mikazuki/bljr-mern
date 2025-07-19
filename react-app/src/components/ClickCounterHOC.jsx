import withCounter from "./HOC/withCounter";

const ClickCounterHOC = ({ counter, handleIncrement }) => {
  return (
    <div>
      <h2>Click Counter</h2>
      <button onClick={handleIncrement}>Clicked {counter} times</button>
    </div>
  )
}

export default withCounter(ClickCounterHOC);