const HoverCounterRP = ({ counter, handleIncrement }) => {
  return (
    <div>
      <h2>Hover Counter</h2>
      <button onMouseOver={handleIncrement}>Hoveres {counter} times</button>
    </div>
  )
}

export default HoverCounterRP;