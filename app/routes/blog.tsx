// // app/routes/blog.tsx
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { fetchContentfulData } from '~/lib/contentful';
import type { BlogPost } from '~/types/contefultypes';
import { BlogList } from '~/components/BlogList/BlogList';

export async function loader({}: LoaderFunctionArgs) {
  const query = `
    {
      blogPageCollection {
        items {
          title
          content
          imageUrl 
        }
      }
    }
  `;

  const data = await fetchContentfulData<any>({ query });

  return json({ posts: data.blogPageCollection.items });
}

export default function Blog() {
  const { posts } = useLoaderData<{ posts: BlogPost[] }>();

  return <BlogList posts={posts} />;
}
