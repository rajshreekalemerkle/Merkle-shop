import { useEffect } from 'react';
import type { BlogPost } from '~/types/contefultypes';


export function BlogList({ posts }: { posts: BlogPost[] }) {
    useEffect(() => {
        console.log(posts); // This will print the posts data structure to the console
      }, [posts]);
  return (
    <section className="blog-list-container">
      <h1 className="blog-title">Latest Blog Posts</h1>
      <div className="blog-list-grid">
        {posts.map((post, index) => (
          <article
            key={index}
            className="blog-post-card"
          >
            <div className="blog-post-content">
              <h2 className="blog-post-title">{post.title}</h2>
            </div>

            <div className="hover-content">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  
                  className="blog-post-image"
                />
              )}
              <div className="blog-post-description">
                <p>{post.content}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
