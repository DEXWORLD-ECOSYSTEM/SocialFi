'use client';

import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { IPostItem } from 'src/types/blog';

import { PostFeatured } from '../components/featured';
import { PostAuthors } from '../components/authors';
import { PostCommunity } from '../components/community';
import { PostVideo } from '../components/video';
import { PostBanner } from '../components/banner';
import { PostRecent } from '../item/recent';
import { PostTrending } from '../item/trending';
import { PostNewsletter } from '../forms/newsletter';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  economiaSection: ReactNode;
  tecnologiaSection: ReactNode;
  meioAmbienteSection: ReactNode;
  geopoliticaSection: ReactNode;
};

export function PostListHomeView({ posts, economiaSection, tecnologiaSection, meioAmbienteSection, geopoliticaSection }: Props) {
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 5).length > 0
    ? posts.filter((post) => post.featured).slice(0, 5)
    : posts.slice(0, 5);

  const trendingPosts = [...posts]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 4);

  const recentPosts = posts.filter((post) => !featuredPosts.includes(post));

  return (
    <Stack spacing={0} sx={{ pb: 10 }}>
      <PostFeatured posts={featuredPosts} />

      <PostAuthors />

      <Container sx={{ mt: { xs: 8, md: 10 } }}>
        <Stack spacing={8}>
          <Stack spacing={3}>
            <Typography variant="h4">Últimas Atualizações</Typography>
            <PostRecent posts={recentPosts} />
          </Stack>

          <PostCommunity title="Fontes Monitoradas" />
        </Stack>
      </Container>

      {/* SEÇÃO DE ECONOMIA (renderizada via prop) */}
      {economiaSection}

      {/* SEÇÃO DE TECNOLOGIA (renderizada via prop) */}
      {tecnologiaSection}

      {/* SEÇÃO DE MEIO AMBIENTE (renderizada via prop) */}
      {meioAmbienteSection}

      {/* SEÇÃO DE GEOPOLÍTICA (renderizada via prop) */}
      {geopoliticaSection}

      <PostVideo />

      <PostBanner />

      <Container sx={{ mt: { xs: 8, md: 10 } }}>
        <PostTrending posts={trendingPosts} title="Destaques da Semana" />
      </Container>

      <PostNewsletter />
    </Stack>
  );
}
