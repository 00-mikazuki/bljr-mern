import axios from "axios";
import { useEffect, useState } from "react";

const PostListWithoutReducer = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {
        !loading && !error && posts.length > 0 ? (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No posts available.</p>
        )
      }
    </div>
  );
}

export default PostListWithoutReducer;