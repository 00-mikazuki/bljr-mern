import { useReducer } from 'react';

const initialState = 0;

const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

const UseReducer = () => {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch('increment')}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch('decrement')}>-</button>
    </div>
  )
}

export default UseReducer;