// // app/routes/blog.tsx
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { fetchBlogList, fetchContentfulData } from '~/lib/contentful';
import type { BlogPost } from '~/types/contefultypes';
import { BlogList } from '~/components/BlogList/BlogList';
import { useState } from 'react';
import { getLocaleFromRequest } from '~/lib/i18n';



export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromRequest(request);

  const data = await fetchContentfulData<any>({
    language: locale.language,
  });
  const blogListItems = await fetchBlogList({
    language: locale.language,
  });


  const posts = data?.blogPageCollection?.items ?? [];

  return json({ posts,blogListItems });
}



export default function Blog() {
  const { posts, blogListItems } = useLoaderData<{
    posts: BlogPost[];
    blogListItems: any[];
  }>();

  return <BlogList posts={posts} blogListItems={blogListItems} />;
}