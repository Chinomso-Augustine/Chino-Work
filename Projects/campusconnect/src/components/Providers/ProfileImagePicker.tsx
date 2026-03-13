// components/ProfileImagePicker.tsx
import { useEffect, useRef, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { uploadProfileImage, deleteProfileImage } from './Storage';

type Props = {
    supabase: SupabaseClient;
    userId: string;
    value: string;               // current avatar URL
    objectPath?: string;         // current storage path
    onChange: (url: string, path?: string) => void;
    bucket?: string;             // default 'profile-images'
    privateBucket?: boolean;     // true if bucket is private
    onUploadingChange?: (uploading: boolean) => void; // optional: let parent disable submit
};

export default function ProfileImagePicker({
    supabase,
    userId,
    value,
    objectPath,
    onChange,
    bucket = 'profile-images',
    privateBucket = false,
    onUploadingChange,
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string>(value || '');
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        setPreview(value || '');
    }, [value]);

    async function doUpload(file: File) {
        if (!userId) {
            setErr('You must be signed in to upload an image.');
            return;
        }
        setUploading(true);
        onUploadingChange?.(true);
        setErr(null);
        try {
            // (Optional) delete the previous object to avoid orphans
            if (objectPath) {
                await deleteProfileImage(supabase, objectPath, bucket);
            }

            const res = await uploadProfileImage(supabase, userId, file, {
                bucket,
                makeSignedUrl: privateBucket,
                filenamePrefix: 'avatar',
            });

            // Update parent form (this must populate profile_image_url + profile_image_path)
            onChange(res.url, res.path);

            // Local preview
            setPreview(res.url);
        } catch (e: any) {
            console.error('Image upload failed:', e);
            setErr(e?.message || 'Upload failed');
            // Clear parent values on failure
            onChange('', undefined);
        } finally {
            setUploading(false);
            onUploadingChange?.(false);
        }
    }

    async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        // Optional: instant local preview
        setPreview(URL.createObjectURL(f));
        await doUpload(f); // <-- auto-upload on pick so user can’t forget to click “Upload”
        // clear file input so picking same file again still triggers change
        if (inputRef.current) inputRef.current.value = '';
    }

    async function onRemove() {
        try {
            if (objectPath) {
                await deleteProfileImage(supabase, objectPath, bucket);
            }
        } catch (e) {
            console.warn('Delete image failed (non-fatal):', e);
        }
        setPreview('');
        onChange('', undefined);
        if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <div className="space-y-2">
            <label className="block font-medium">Profile picture</label>

            {preview ? (
                <img
                    src={preview}
                    alt="Profile preview"
                    className="w-28 h-28 rounded-full object-cover border"
                />
            ) : (
                <div className="w-28 h-28 rounded-full border grid place-items-center text-sm text-gray-500">
                    No image
                </div>
            )}

            <div className="flex gap-3 mt-2">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={onPick}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="px-3 py-1 rounded border"
                    disabled={uploading}
                >
                    Choose image
                </button>

                {preview && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="px-3 py-1 rounded border"
                        disabled={uploading}
                    >
                        Remove
                    </button>
                )}
            </div>

            {uploading && <p className="text-xs text-purple-500">Uploading…</p>}
            {err && <p className="text-red-600 text-sm">{err}</p>}
        </div>
    );
}
