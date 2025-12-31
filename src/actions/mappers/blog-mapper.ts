import { IPost } from 'src/types/blog';

export function mapPost(apiPost: any): IPost {
  // Lógica para mapear os dados da API para o formato do front-end
  return {
    id: apiPost.id,
    title: apiPost.title,
    content: apiPost.content,
    coverUrl: apiPost.cover_image,
    author: {
      name: apiPost.user.name,
      avatarUrl: apiPost.user.profile_image,
    },
    createdAt: new Date(apiPost.published_at),
    // ... outros campos
  };
}
