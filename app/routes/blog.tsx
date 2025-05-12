// // app/routes/blog.tsx
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { fetchContentfulData } from '~/lib/contentful';
import type { BlogPost } from '~/types/contefultypes';
import { BlogList } from '~/components/BlogList/BlogList';
import { useState } from 'react';
import { getLocaleFromRequest } from '~/lib/i18n';



export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromRequest(request);

  const data = await fetchContentfulData<any>({
    language: locale.language,
  });

  const posts = data?.blogPageCollection?.items ?? [];

  return json({ posts });
}



export default function Blog() {
  const { posts } = useLoaderData<{ posts: BlogPost[] }>();

  return <BlogList posts={posts} />;
}
