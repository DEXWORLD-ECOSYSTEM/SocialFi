import type { PostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getPosts } from 'src/actions/blog-ssr';

import { PostList } from './list';

// ----------------------------------------------------------------------

export async function MeioAmbiente() {
  const data = await getPosts();

  // A função getPosts() pode retornar um objeto { posts: [...] }, então precisamos extrair o array.
  const allPosts = Array.isArray(data) ? data : data?.posts || [];

  const meioAmbientePosts = allPosts.filter((post: PostItem) => post.category === 'Meio Ambiente');

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.neutral',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: 'center',
        }}
      >
        Meio Ambiente
      </Typography>

      <PostList posts={meioAmbientePosts.slice(0, 4)} />
    </Box>
  );
}
