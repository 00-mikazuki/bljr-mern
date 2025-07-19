import axios from "axios";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: action.data,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.error,
      };
    default:
      return state;
  }
}

const UseList = (url, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(url);
        dispatch({ type: 'FETCH_SUCCESS', data: response.data });
      } catch (error) {
        console.error("Error fetching posts:", error);
        dispatch({ type: 'FETCH_ERROR', error: "Failed to fetch posts" });
      }
    }
    fetchPosts();
  }, [url]);

  return state;
}

export default UseList;