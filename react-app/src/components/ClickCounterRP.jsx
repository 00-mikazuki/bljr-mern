const ClickCounterRP = ({ counter, handleIncrement }) => {
  return (
    <div>
      <h2>Click Counter</h2>
      <button onClick={handleIncrement}>Clicked {counter} times</button>
    </div>
  )
}

export default ClickCounterRP;