import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <h2>Post List Page</h2>
      <button onClick={() => setSearchParams({ sort: "latest" })}>Latest Posts</button>
      <button onClick={() => setSearchParams({})}>Reset</button>
      <p>Current Sort: {searchParams.get("sort") || "none"}</p>
      <p>Post 1</p>
      <p>Post 2</p>
      <p>Post 3</p>
    </div>
  )
}

export default PostList;