import { _posts } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

/**
 * BUSCA PRINCIPAL: Retorna todos os posts para a PostListHomeView.
 * Orquestra os dados para as 8 seções do portal.
 */
export async function getPosts() {
  // Simula latência da Cloudflare Edge para testar Skeletons
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return { 
    posts: _posts 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA INDIVIDUAL: Utilizada na página de detalhes do artigo.
 * Faz o "match" entre o slug da URL e o título do post.
 */
export async function getPost(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Decodifica a URL (ex: 'Bitcoin-rompe' -> 'Bitcoin rompe')
  const decodedTitle = decodeURIComponent(title).replace(/-/g, ' ');

  const post = _posts.find((p) => p.title.toLowerCase() === decodedTitle.toLowerCase());
  
  return { 
    post: post || null 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA RELACIONADOS: Utilizada no final de cada artigo ou barras laterais.
 */
export async function getLatestPosts(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const decodedTitle = decodeURIComponent(title).replace(/-/g, ' ');

  // Filtra o post atual e pega os 4 mais recentes
  const latestPosts = _posts
    .filter((p) => p.title.toLowerCase() !== decodedTitle.toLowerCase())
    .slice(0, 4);

  return { 
    latestPosts 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA POR CATEGORIA: (Nova) Para alimentar a rota category/[slug]
 */
export async function getPostsByCategory(category: string) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const filteredPosts = _posts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return { 
    posts: filteredPosts 
  };
}