'use client';

import type { IPostItem } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { useBlog } from 'src/hooks/use-blog';

import { PostList } from '../item/post-list';
import { PostSort } from '../components/post-sort';
import { PostSearch } from '../components/post-search';
import { PostCarouselFeatured } from '../components/post-carousel-featured';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostListHomeView({ posts: postsProp }: Props) {
  const { posts, filters, methods } = useBlog(postsProp);

  const pageCount = Math.ceil(posts.all.length / 8);

  return (
    <Container sx={{ mt: 10 }}>
      <PostCarouselFeatured posts={posts.featured} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={filters.search.query}
          results={filters.search.results}
          onSearch={methods.onSearch}
          href={(title) => `/post/${title}`}
        />
        <PostSort sortBy={filters.sortBy} onSortBy={methods.onSortBy} />
      </Stack>

      <PostList posts={posts.paginated} />

      {posts.all.length > 8 && (
        <Pagination
          page={filters.page}
          count={pageCount}
          onChange={methods.onChangePage}
          sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}
        />
      )}
    </Container>
  );
}
