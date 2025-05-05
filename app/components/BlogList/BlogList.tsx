import { useEffect, useState } from 'react';
import type { BlogPost } from '~/types/contefultypes';
import './BlogList.css';

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <section className="blog-list-container">
      <h1 className="blog-title">Latest Blog</h1>
      <div className="blog-list-grid">
        {posts.map((post, index) => (
          <article
            key={index}
            className={`blog-post-card ${expandedIndex === index ? 'expanded' : ''}`}
            onMouseEnter={() => setExpandedIndex(index)}
          >
            <div className="image-overlay-wrapper">
              {post.imageUrl && (
                <img src={post.imageUrl} className="blog-post-image" />
              )}
              <div className="overlay-text">
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-description">{post.content}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}