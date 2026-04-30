import { baseComments } from "./pokedex";
import type { CommentEntry } from "../types";

const STORAGE_KEY = "pokedex-comments-v1";

const loadStoredComments = (): CommentEntry[] | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CommentEntry[];
  } catch {
    return null;
  }
};

const saveStoredComments = (entries: CommentEntry[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getCommentsFor = (id: string): CommentEntry => {
  const stored = loadStoredComments();
  const source = stored ?? baseComments;
  const entry = source.find((item) => item.id === id);
  return entry ?? { id, comments: [] };
};

export const addCommentFor = (
  id: string,
  comment: { author: string; body: string }
) => {
  const stored = loadStoredComments() ?? baseComments;
  const next = stored.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      comments: [
        ...item.comments,
        {
          author: comment.author,
          body: comment.body,
          date: Date.now(),
        },
      ],
    };
  });
  saveStoredComments(next);
  return next.find((item) => item.id === id) ?? { id, comments: [] };
};
