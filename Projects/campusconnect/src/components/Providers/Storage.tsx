// components/Storage.ts
import type { SupabaseClient } from "@supabase/supabase-js";

type UploadOpts = {
  bucket?: string;          // default 'profile-images'
  filenamePrefix?: string;  // default 'avatar'
  makeSignedUrl?: boolean;  // if bucket is private
  signedSeconds?: number;   // default 31536000 (1 year)
};

export async function uploadProfileImage(
  supabase: SupabaseClient,
  userId: string,
  file: File,
  opts: UploadOpts = {}
): Promise<{ path: string; url: string }> {
  const bucket = opts.bucket ?? "profile-images";
  const prefix = opts.filenamePrefix ?? "avatar";
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `${userId}/${prefix}_${Date.now()}.${ext}`; // <-- critical: uid folder

  // Upload under <uid>/... to satisfy your storage RLS policy
  const { error: uploadErr } = await supabase
    .storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadErr) {
    throw uploadErr;
  }

  // Public URL vs signed URL
  if (opts.makeSignedUrl) {
    const seconds = opts.signedSeconds ?? 31536000; // 1 year
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, seconds);
    if (error) throw error;
    return { path, url: data.signedUrl };
  } else {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { path, url: data.publicUrl };
  }
}

export async function deleteProfileImage(
  supabase: SupabaseClient,
  objectPath: string,
  bucket: string = "profile-images"
) {
  if (!objectPath) return;
  const { error } = await supabase.storage.from(bucket).remove([objectPath]);
  if (error) throw error;
}
