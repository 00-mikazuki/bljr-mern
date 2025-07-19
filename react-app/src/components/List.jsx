const List = () => {
  const items = ['react', 'vue', 'angular'];
  return (
    <div>
      <h2>List Component</h2>
      <p>This component demonstrates how to render a list in React.</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default List;