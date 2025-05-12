import { useEffect, useState } from 'react';
import type { BlogPost } from '~/types/contefultypes';
import './BlogList.css';

export function BlogList({
  posts,
  blogListItems,
}: {
  posts: BlogPost[];
  blogListItems: any[];
}) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  console.log("Blog List Items in browser:", blogListItems);
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <section className="blog-list-container">
      {/* <h1 className="blog-title">Latest Blog</h1> */}
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
      {blogListItems?.map((item: any, index: number) => (
        <div key={index} className="blog-featured-section">
         
          <h2 className="featured-heading">{item.heading}</h2>

         
          {item.list?.map((listItem: any, subIndex: number) => (
            <div
              key={`${index}-${subIndex}`}
              className={`blog-featured-item ${
                subIndex % 2 === 0 ? 'row-normal' : 'row-reverse'
              }`}
            >
              <div className="featured-image">
                <img src={listItem.imageUrl} alt={listItem.title} />
              </div>
              <div className="featured-content">
                <h3>{listItem.title}</h3>
                <p>{listItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}