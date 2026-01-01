'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { IPostItem } from 'src/types/blog';

// Importação das 8 Seções Refinadas
import { PostFeatured } from '../components/featured';     // 1. Hero
import { PostAuthors } from '../components/authors';       // 2. Criadores
import { PostCommunity } from '../components/community';   // 3. Comunidades
import { PostVideo } from '../components/video';           // 4. Vídeos
import { PostBanner } from '../components/banner';         // 5. PUB
import { PostRecent } from '../item/recent';               // 6. Recentes
import { PostTrending } from '../item/trending';           // 7. Alta
import { PostNewsletter } from '../forms/newsletter';       // 8. Newsletter

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostListHomeView({ posts }: Props) {
  
  // 1. Lógica de Curadoria de Dados
  // Destaques: Posts marcados como 'featured' ou os 5 primeiros
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 5).length > 0 
    ? posts.filter((post) => post.featured).slice(0, 5) 
    : posts.slice(0, 5);

  // Trending: Ordenados por visualizações para a seção "Em Alta"
  const trendingPosts = [...posts]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 4);

  // Recentes: Excluímos os destaques do Hero para não repetir conteúdo
  const recentPosts = posts.filter(post => !featuredPosts.includes(post));

  return (
    <Stack spacing={0} sx={{ pb: 10 }}>
      
      {/* 1. Hero - Carousel de Destaque (Impacto Visual Imediato) */}
      <PostFeatured posts={featuredPosts} />

      {/* 2. Criadores - Autores e Especialistas (Autoridade) */}
      <PostAuthors />

      <Container sx={{ mt: { xs: 8, md: 10 } }}>
        <Stack spacing={8}>
          
          {/* 6. Recentes - Grelha Cronológica (O Coração do Blog) */}
          <Stack spacing={3}>
            <Typography variant="h4">Últimas Atualizações</Typography>
            <PostRecent posts={recentPosts} />
          </Stack>

          {/* 3. Comunidades - Fontes Monitoradas (Ecossistema) */}
          <PostCommunity title="Fontes Monitoradas" />

        </Stack>
      </Container>

      {/* 4. Vídeos - Galeria Youtube (Engajamento Multimedia) */}
      <PostVideo />

      {/* 5. PUB - Banner Publicitário (Monetização/Aviso) */}
      <PostBanner />

      <Container sx={{ mt: { xs: 8, md: 10 } }}>
        {/* 7. Alta - Mais Engajados (Filtro por Performance) */}
        <PostTrending posts={trendingPosts} title="Destaques da Semana" />
      </Container>

      {/* 8. Newsletter - Conversão (Retenção de Usuário) */}
      <PostNewsletter />
      
    </Stack>
  );
}