import { _mock } from 'src/_mock/_mock';
import { _id, _postTitles, _descriptions, _fullNames, _sentences } from 'src/_mock/assets';

// ----------------------------------------------------------------------

/**
 * NOTA: Este array é gerado dinamicamente para simular uma resposta de API,
 * usando as ferramentas de mock do próprio template.
 */
const _posts = Array.from({ length: 8 }, (_, index) => ({
  id: _id[index],
  author: {
    name: _fullNames[index],
    avatarUrl: _mock.image.avatar(index),
  },
  comments: [], // Mantido simples para o exemplo
  comment: (index === 2 && 8) || (index === 3 && 12) || 2,
  coverUrl: _mock.image.cover(index),
  createdAt: _mock.time(index),
  description: _descriptions[index],
  favorite: _mock.number.nativeL(index),
  favoritePerson: Array.from({ length: 8 }, (__, i) => ({
    name: _fullNames[i + 8],
    avatarUrl: _mock.image.avatar(i + 8),
  })),
  message: _sentences[index],
  share: _mock.number.nativeL(index),
  tags: ['Design', 'UX', 'UI', 'Programming', 'Business'].slice(0, _mock.number.nativeS(index)),
  title: _postTitles[index],
  view: _mock.number.nativeL(index),
  publish: 'published',
  content: _sentences[index+1] + _sentences[index+2],
  metaTitle: _postTitles[index],
  totalViews: _mock.number.nativeL(index),
  totalShares: _mock.number.nativeL(index),
  totalComments: (index === 2 && 8) || (index === 3 && 12) || 2,
  totalFavorites: _mock.number.nativeL(index),
}));


// ----------------------------------------------------------------------

export async function getPosts() {
  // Simula uma pequena espera, como se a API estivesse respondendo
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { posts: _posts };
}

// ----------------------------------------------------------------------

export async function getPost(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Encontra o post pelo título (como a API faria)
  const post = _posts.find((p) => p.title === title.replace(/-/g, ' '));
  
  return { post };
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  // Filtra os posts para retornar os mais recentes, excluindo o atual
  const latestPosts = _posts.filter((p) => p.title !== title.replace(/-/g, ' ')).slice(0, 8);

  return { latestPosts };
}