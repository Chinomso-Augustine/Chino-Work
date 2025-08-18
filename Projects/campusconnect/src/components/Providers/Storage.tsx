import { SupabaseClient } from "@supabase/supabase-js";



type UploadResult = {
    path: string;
    url: string;
}
{/*Picture format options */ }
type UploadOptions = {
    bucket?: string; // defaults to 'profile-images'
    makeSignedUrl?: boolean; // set true if bucket is private
    signedUrlExpiresIn?: number; // seconds, default 3600
    maxSizeBytes?: number; // default 5MB
    allowedTypes?: RegExp; // default /^image\/(png|jpe?g|webp|gif)$/i
    filenamePrefix?: string; // optional custom prefix in object name
    upsert?: boolean; // default true (replace same name)
}

{/**Image parameters / input validation */ }

export async function uploadProfileImage(
    supabase: SupabaseClient,
    userId: string,
    file: File,
    opts: UploadOptions = {}
): Promise<UploadResult> {
    if (!userId) throw new Error('Missing user id');
    if (!file) throw new Error('No file provided');

    const {
        bucket = 'profile-images',
        makeSignedUrl = false,
        signedUrlExpiresIn = 3600,
        maxSizeBytes = 5 * 1024 * 1024,
        allowedTypes = /^image\/(png|jpe?g|webp|gif)$/i,
        filenamePrefix,
        upsert = true,
    } = opts;

    // Basic validations
    if (!allowedTypes.test(file.type)) {
        throw new Error('Please upload a PNG, JPG, WEBP, or GIF image.');
    }
    if (file.size > maxSizeBytes) {
        throw new Error(`Image is too large. Max ${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB.`);
    }

    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'png';
    const safePrefix = filenamePrefix?.replace(/[^\w-]/g, '') || 'avatar';
    const objectName = `${userId}/${safePrefix}-${Date.now()}.${ext}`;

    // Upload
    const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(objectName, file, {
            cacheControl: '3600',
            upsert,
            contentType: file.type || 'image/png',
        });

    if (uploadErr) {
        // common cause: missing storage policy for authenticated uploads
        throw new Error(`Upload failed: ${uploadErr.message}`);
    }

    // URL: public or signed
    if (makeSignedUrl) {
        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(objectName, signedUrlExpiresIn);
        if (error || !data?.signedUrl) {
            throw new Error('Could not create a signed URL for the image.');
        }
        return { path: objectName, url: data.signedUrl };
    } else {
        const { data } = supabase.storage.from(bucket).getPublicUrl(objectName);
        return { path: objectName, url: data.publicUrl };
    }
}

export async function deleteProfileImage(
    supabase: SupabaseClient,
    objectPath: string,
    bucket = 'profile-images'
): Promise<void> {
    if (!objectPath) return;
    const { error } = await supabase.storage.from(bucket).remove([objectPath]);
    if (error) {
        // Don’t hard-fail your UI on cleanup errors—log and move on
        console.warn('Failed to delete old image:', error.message);
    }
}