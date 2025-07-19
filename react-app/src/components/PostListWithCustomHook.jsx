import UseList from "./hooks/UseList";

const url = 'https://jsonplaceholder.typicode.com/posts';
const initialState = {
  loading: true,
  posts: [],
  error: null,
}

const PostListWithCustomHook = () => {
  const state = UseList(url, initialState);

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
  )
}

export default PostListWithCustomHook;