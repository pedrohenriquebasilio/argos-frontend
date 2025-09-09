import { Post, Comment, Album, Photo, Todo, User } from '@/types/api';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return response.json();
};

export const fetchAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await fetch(`${BASE_URL}/albums/${albumId}/photos`);
  if (!response.ok) throw new Error('Failed to fetch photos');
  return response.json();
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

export const updatePost = async (id: number, post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...post, id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};

export const patchPost = async (id: number, updates: Partial<Omit<Post, 'id'>>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to patch post');
  return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

export const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...user, id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

export const patchUser = async (id: number, updates: Partial<Omit<User, 'id'>>): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to patch user');
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};