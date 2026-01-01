import { getPostsByCategory } from 'src/actions/blog-ssr';
import { PostListView } from 'src/sections/blog/view/post-list-view';

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  // Busca os posts filtrados pela categoria (usando a action que criamos)
  const { posts } = await getPostsByCategory(slug);

  return (
    <PostListView 
      posts={posts} 
      title={`Categoria: ${slug.toUpperCase()}`} 
    />
  );
}