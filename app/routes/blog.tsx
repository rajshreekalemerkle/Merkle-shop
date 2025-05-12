// // app/routes/blog.tsx
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { fetchContentfulData } from '~/lib/contentful';
import type { BlogPost } from '~/types/contefultypes';
import { BlogList } from '~/components/BlogList/BlogList';
import { useState } from 'react';


export async function loader({context}: LoaderFunctionArgs) {
  const query = ``;

  const [selectedLanguage, setLang] = useState('en');
  

  const { language, country } = context.storefront.i18n;

  const data = await fetchContentfulData<any>({ query, language });

  return json({ posts: data.blogPageCollection.items });
}

export default function Blog() {
  const { posts } = useLoaderData<{ posts: BlogPost[] }>();

  return <BlogList posts={posts} />;
}
