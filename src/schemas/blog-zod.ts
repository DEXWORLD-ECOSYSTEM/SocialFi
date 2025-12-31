import { z } from 'zod';

const dateValueSchema = z.union([z.string(), z.number(), z.date()]);

const postCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  message: z.string(),
  avatarUrl: z.string(),
  postedAt: dateValueSchema,
  users: z.array(z.object({
    id: z.string(),
    name: z.string(),
    avatarUrl: z.string(),
  })),
  replyComment: z.array(z.object({
    id: z.string(),
    userId: z.string(),
    message: z.string(),
    tagUser: z.string().optional(),
    postedAt: dateValueSchema,
  })),
});

export const postItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  publish: z.string(),
  content: z.string(),
  coverUrl: z.string(),
  metaTitle: z.string(),
  totalViews: z.number(),
  totalShares: z.number(),
  description: z.string(),
  totalComments: z.number(),
  createdAt: dateValueSchema,
  totalFavorites: z.number(),
  metaKeywords: z.array(z.string()),
  metaDescription: z.string(),
  comments: z.array(postCommentSchema),
  author: z.object({
    name: z.string(),
    avatarUrl: z.string(),
  }),
  favoritePerson: z.array(z.object({
    name: z.string(),
    avatarUrl: z.string(),
  })),
});

export const postsSchema = z.array(postItemSchema);
