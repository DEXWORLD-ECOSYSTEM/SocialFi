'use client';

import type { IPostItem } from 'src/types/blog';
import type { SxProps, Theme } from '@mui/material/styles';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';
import { Carousel, useCarousel } from 'src/components/carousel';
import Autoplay from 'embla-carousel-autoplay';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  sx?: SxProps<Theme>;
};

export function PostCarouselFeatured({ posts, sx }: Props) {
  const carousel = useCarousel({
    loop: true,
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  return (
    <Card sx={sx}>
      <Carousel carousel={carousel}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  post: IPostItem;
};

function PostItem({ post }: PostItemProps) {
  const { coverUrl, title, author, createdAt } = post;

  return (
    <Stack sx={{ position: 'relative' }}>
      <Avatar
        alt={author.name}
        src={author.avatarUrl}
        sx={{ top: 24, left: 24, zIndex: 9, position: 'absolute' }}
      />

      <CardContent
        sx={{
          pt: 10,
          width: 1,
          zIndex: 9,
          bottom: 0,
          color: 'common.white',
          position: 'absolute',
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ mb: 1, typography: 'caption' }}>
          {createdAt && <time dateTime={createdAt.toString()}>{fDate(createdAt)}</time>}
        </Stack>

        <Link component={RouterLink} href={paths.post.details(title)} variant="h5" color="inherit" sx={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </CardContent>

      <Image
        alt={title}
        src={coverUrl}
        ratio="16/9"
        slotProps={{
          overlay: {
            sx: {
              bgcolor: alpha('#000000', 0.64),
            },
          },
        }}
      />
    </Stack>
  );
}
