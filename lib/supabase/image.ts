const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

export default function supabaseLoader({ src, width, quality }: { src: string; width: number; quality: number | null }) {
  // Check if its a local static asset (starts with /) 
    if (src.startsWith('/') && !src.includes('storage/v1')) {
    return src;
  }

  // If its already a full URL (like Unsplash), return it directly
  if (src.startsWith('http')) {
    return src;
  }

  // otherwise its supabase image
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`
}