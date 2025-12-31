'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { PostList } from '../post-list';
import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';
import { PostCarouselFeatured } from '../post-carousel-featured'; // Importação do Hero

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostListHomeView({ posts }: Props) {
  // 1. Separamos os posts de destaque para o Carrossel (Hero)
  const featuredPosts = posts.slice(0, 5);

  // 2. Os posts restantes para a lista comum abaixo
  const regularPosts = posts.slice(5);

  return (
    <>
      {/* SEÇÃO HERO: Fora do Container para largura total e efeito Blur */}
      <PostCarouselFeatured posts={featuredPosts} />

      <Container sx={{ mt: 10, mb: 10 }}>
        {/* Barra de Pesquisa e Filtros */}
        <Stack
          spacing={3}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{ mb: { xs: 8, md: 10 } }}
        >
          <PostSearch
            redirectPath={paths.post.details}
            sx={{ 
              width: 1,
              bgcolor: (theme) => theme.vars.palette.background.neutral,
            }}
          />

          <PostSort
            sort='latest'
            sortOptions={SORT_OPTIONS}
            onSort={() => {}}
            sx={{ flexShrink: 0 }}
          />
        </Stack>

        {/* LISTA DE POSTS: Grelha uniforme abaixo do Hero */}
        <PostList posts={regularPosts} />
      </Container>
    </>
  );
}