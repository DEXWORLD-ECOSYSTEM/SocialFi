import type { Metadata } from 'next';
import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost, getLatestPosts, getPosts } from 'src/actions/blog-ssr';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post details - ${CONFIG.appName}` };

type Props = {
  params: { title: string };
};

export default async function Page({ params }: Props) {
  const { title } = params;

  const post = await getPost(title);

  if (!post.post) {
    notFound();
  }

  await getLatestPosts(title);

  return <PostDetailsView post={post.post} />;
}

// ----------------------------------------------------------------------

/**
 * Static Exports in Next.js
 *
 * 1. Set `isStaticExport = true` in `next.config.{mjs|ts}`.
 * 2. This allows `generateStaticParams()` to pre-render dynamic routes at build time.
 *
 * For more details, see:
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 *
 * NOTE: Remove all "generateStaticParams()" functions if not using static exports.
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  const data: IPostItem[] = CONFIG.isStaticExport ? posts.posts : posts.posts.slice(0, 1);

  return data.map((post) => ({
    title: kebabCase(post.title),
  }));
}
