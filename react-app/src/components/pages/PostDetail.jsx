import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL parameters

  return (
    <div>
      <h2>Post {id} Detail</h2>
    </div>
  )
}

export default PostDetail;