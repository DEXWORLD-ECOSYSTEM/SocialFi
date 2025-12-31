'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid padrão da v6/v7.5
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { PostItemSkeleton } from './post-skeleton';
import { PostItem } from './post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

export function PostList({ posts, loading }: Props) {
  
  const renderLoading = () => (
    <Box
      sx={{
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { 
          xs: 'repeat(1, 1fr)', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)', 
          lg: 'repeat(4, 1fr)' 
        },
      }}
    >
      {[...Array(8)].map((_, index) => (
        <PostItemSkeleton key={index} />
      ))}
    </Box>
  );

  const renderList = () => (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid 
          key={post.id} 
          // CORREÇÃO: As propriedades de breakpoint agora ficam dentro de 'size'
          // A propriedade 'item' não é mais necessária nesta versão do MUI
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <PostItem 
            post={post} 
            detailsHref={paths.post.details(post.title)} 
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      {loading ? renderLoading() : renderList()}

      {posts.length > 8 && (
        <Stack sx={{ mt: 8, alignItems: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={<CircularProgress size={18} color="inherit" />}
          >
            Carregar mais
          </Button>
        </Stack>
      )}
    </>
  );
}