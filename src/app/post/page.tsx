// src/app/post/page.tsx

import { getPosts } from 'src/actions/blog-ssr';
import { PostListHomeView } from 'src/sections/blog/view/post-list-home-view';
import { Economia } from 'src/sections/blog/item/economia';
import { Tecnologia } from 'src/sections/blog/item/tecnologia';
import { MeioAmbiente } from 'src/sections/blog/item/meio-ambiente';
import { Geopolitica } from 'src/sections/blog/item/geopolitica'; // 1. Importar a nova seção

// Configuração para execução na Edge da Cloudflare
export const runtime = 'edge';

export const metadata = {
  title: 'DEX World: Monitorização e Notícias Cripto',
  description: 'Acompanhe as principais comunidades, vídeos e tendências do mercado blockchain em tempo real.',
};

export default async function PostListPage() {
  const data = await getPosts();

  const posts = Array.isArray(data) ? data : (data?.posts || []);

  // 2. Renderizar todas as seções e passá-las como props (slots)
  return (
    <PostListHomeView
      posts={posts}
      economiaSection={<Economia />}
      tecnologiaSection={<Tecnologia />}
      meioAmbienteSection={<MeioAmbiente />}
      geopoliticaSection={<Geopolitica />}
    />
  );
}
