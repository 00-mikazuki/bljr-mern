import axios from "axios";
import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  posts: [],
  error: null,
}

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

const PostListWithReducer = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({ type: 'FETCH_SUCCESS', data: response.data });
      } catch (error) {
        console.error("Error fetching posts:", error);
        dispatch({ type: 'FETCH_ERROR', error: "Failed to fetch posts" });
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {
        !state.loading && !state.error && state.posts.length > 0 ? (
          <ul>
            {state.posts.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          !state.loading && <p>No posts available.</p>
        )
      }
    </div>
  );
}

export default PostListWithReducer;