import React, { useEffect, useState } from 'react';

const RedditPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reddit')
      .then(res => res.json())
      .then(data => {
        console.log('Reddit data:', data);
        if (data && data.data && data.data.children) {
          setPosts(data.data.children);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div>
      <h1>Reddit Posts</h1>
      {posts.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h2>{item.data.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: item.data.selftext_html || '' }} />
          <a href={item.data.url} target="_blank" rel="noopener noreferrer">Go to post</a>
          <p>Score: {item.data.score}</p>
        </div>
      ))}
    </div>
  );
};

export default RedditPosts;
