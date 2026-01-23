import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost } from 'src/actions/blog-ssr';
import { PostEditView } from 'src/sections/blog/management/post-edit-view';

// ----------------------------------------------------------------------

// 1. Mudamos para nodejs para evitar erros de serialização no Edge
export const runtime = 'nodejs';

// 2. Forçamos dynamic para que o build não tente "adivinhar" posts de mock que quebram
export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: `Edit post | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  try {
    const { post } = await getPost(title);

    if (!post) {
      return notFound();
    }

    return <PostEditView post={post} />;
  } catch (error) {
    console.error("Erro ao carregar post para edição:", error);
    return notFound();
  }
}
