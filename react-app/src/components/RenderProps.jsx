const RenderProps = ({ render }) => {
  return (
    <div>
      <h2>Render Props Example</h2>
      <p>This component demonstrates the use of render props in React.</p>
      {render('React')}
    </div>
  );
};

export default RenderProps;