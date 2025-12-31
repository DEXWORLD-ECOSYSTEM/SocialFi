
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export function PostDetailsSkeleton() {
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Skeleton variant="rectangular" width="100%" height={480} sx={{ borderRadius: 2 }} />
      <Stack sx={{ mt: 5 }} spacing={3}>
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
      </Stack>
    </Container>
  );
}
