import { useReducer } from 'react';

const initialState = {
  count: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.value };
    case 'decrement':
      return { count: state.count - action.value };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const ComplexCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment', value: 2 })}>+</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'decrement', value: 3 })}>-</button>
    </div>
  )
}

export default ComplexCounter;