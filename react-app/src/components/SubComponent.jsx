function SubComponent({ children, text }) {
  return (
    <div>
      <h2>Sub Component</h2>
      <p>This is a sub component.</p>
      <p>Child: {children}</p>
      <p>Props: {text}</p>
    </div>
  );
}

export default SubComponent;