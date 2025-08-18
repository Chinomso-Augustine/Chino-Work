// components/ProfileImagePicker.tsx
import { useEffect, useRef, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { uploadProfileImage, deleteProfileImage } from './Storage';

type Props = {
    supabase: SupabaseClient;
    userId: string;
    value: string;               // current avatar URL (formData.profileImageUrl)
    objectPath?: string;         // current storage path (formData.profileImagePath)
    onChange: (url: string, path?: string) => void; // update parent
    bucket?: string;             // default 'profile-images'
    privateBucket?: boolean;     // set true if bucket is private (uses signed URLs)
};

export default function ProfileImagePicker({
    supabase,
    userId,
    value,
    objectPath,
    onChange,
    bucket = 'profile-images',
    privateBucket = false,
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selected, setSelected] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(value || '');
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        setPreview(value || '');
    }, [value]);

    function onPick(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        setSelected(f);
        setPreview(URL.createObjectURL(f));
        setErr(null);
    }

    async function onUpload() {
        if (!selected) return;
        if (!userId) {
            setErr('You must be signed in to upload an image.');
            return;
        }
        setUploading(true);
        setErr(null);
        try {
            // Optional: delete previous object to avoid orphans
            if (objectPath) {
                await deleteProfileImage(supabase, objectPath, bucket);
            }

            const res = await uploadProfileImage(supabase, userId, selected, {
                bucket,
                makeSignedUrl: privateBucket,
                filenamePrefix: 'avatar',
            });

            onChange(res.url, res.path);
            setSelected(null);
        } catch (e: any) {
            setErr(e?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

    async function onRemove() {
        // If you want to actually delete the stored file when user removes:
        if (objectPath) {
            await deleteProfileImage(supabase, objectPath, bucket);
        }
        setSelected(null);
        setPreview('');
        onChange('', undefined);
        if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <div>
            <label className="block mb-2 font-medium">Profile picture</label>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onPick}
                className="hidden"
            />

            <div className="flex gap-3 mt-3">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="px-3 py-1 rounded border"
                >
                    Choose image
                </button>

                <button
                    type="button"
                    onClick={onUpload}
                    disabled={!selected || uploading}
                    className="px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50"
                >
                    {uploading ? 'Uploading…' : 'Upload'}
                </button>

                {preview && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="px-3 py-1 rounded border"
                    >
                        Remove
                    </button>
                )}
            </div>


            {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
        </div>
    );
}
