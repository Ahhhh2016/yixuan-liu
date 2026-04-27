import { supabase } from './supabaseClient.js';

function formatCommentRecord(row) {
  return {
    id: row.id,
    parentId: row.parent_id,
    username: row.username,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}

export async function createProfile(userId, username) {
  const normalized = username.trim();
  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: userId, username: normalized })
    .select('id, username')
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function listComments(contentType, contentSlug) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, parent_id, username, message, created_at')
    .eq('content_type', contentType)
    .eq('content_slug', contentSlug)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }
  return (data || []).map(formatCommentRecord);
}

export async function createComment({ contentType, contentSlug, username, message, parentId = null }) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_type: contentType,
      content_slug: contentSlug,
      username,
      message,
      parent_id: parentId,
    })
    .select('id, parent_id, username, message, created_at')
    .single();

  if (error) {
    throw error;
  }
  return formatCommentRecord(data);
}
