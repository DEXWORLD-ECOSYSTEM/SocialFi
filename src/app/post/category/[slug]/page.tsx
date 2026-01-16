import { PostListView } from 'src/sections/blog/view/post-list-view';

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  // const { slug } = params;

  // const { posts } = await getPostsByCategory(slug);

  return <PostListView />;
}
