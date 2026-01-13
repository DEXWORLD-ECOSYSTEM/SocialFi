import type { PostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getPosts } from 'src/actions/blog-ssr';

import { PostList } from './list';

// ----------------------------------------------------------------------

export async function Tecnologia() {
  const data = await getPosts();

  // A função getPosts() pode retornar um objeto { posts: [...] }, então precisamos extrair o array.
  const allPosts = Array.isArray(data) ? data : data?.posts || [];

  const tecnologiaPosts = allPosts.filter((post: PostItem) => post.category === 'Tecnologia');

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: 'center',
        }}
      >
        Tecnologia
      </Typography>

      <PostList posts={tecnologiaPosts.slice(0, 4)} />
    </Box>
  );
}
