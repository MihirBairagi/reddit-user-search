import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserDetailsPage() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://www.reddit.com/user/${username}/submitted.json`);
      const data = await response.json();
      setPosts(data.data.children);
    };

    fetchPosts();
  }, [username]);

  return (
    <div className='user-detail-box' >
      <h2>Posts by {username}</h2>
      {posts.length === 0 && <p>No posts found.</p>}
      <ol>
        {posts.map(post => (
          <li key={post.data.id}>
            <a href={`https://reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
              {post.data.title}
            </a>
          </li>
        ))}
      </ol>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default UserDetailsPage;
