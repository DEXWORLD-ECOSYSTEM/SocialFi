import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost } from 'src/actions/blog-ssr';
import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

// Forçamos o runtime Node.js para evitar o erro de serialização do Edge
export const runtime = 'nodejs';

// Garantimos que a página seja tratada de forma dinâmica se o título não for encontrado
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = { title: `Post details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  try {
    // Busca os dados do post
    const { post } = await getPost(title);

    if (!post) {
      return notFound();
    }

    return <PostDetailsView post={post} />;
  } catch (error) {
    console.error("Erro ao carregar o post:", error);
    return notFound();
  }
}
