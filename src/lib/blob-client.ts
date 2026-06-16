import { put, del, head } from "@vercel/blob";

/** Upload image to Blob storage */
export async function uploadImage(
  buffer: Buffer,
  filename: string,
  contentType: string
) {
  const blobName = `images/${Date.now()}-${filename}`;
  const result = await put(blobName, buffer, {
    contentType,
    access: "public",
  });
  return result.url;
}

/** Delete image from Blob storage */
export async function deleteImage(url: string) {
  const pathname = new URL(url).pathname;
  const blobName = pathname.replace(/^\//, ""); // Remove leading slash
  await del(blobName);
}

/** Check if file exists in Blob */
export async function blobExists(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const blobName = pathname.replace(/^\//, "");
    const result = await head(blobName);
    return result !== undefined;
  } catch {
    return false;
  }
}

/** Upload service image (branding, before/after) */
export async function uploadServiceImage(
  buffer: Buffer,
  serviceId: string,
  type: "banner" | "gallery" | "before_after"
) {
  const timestamp = Date.now();
  const ext = "jpg"; // Assume JPEG for now
  const filename = `services/${serviceId}/${type}-${timestamp}.${ext}`;

  const result = await put(filename, buffer, {
    contentType: "image/jpeg",
    access: "public",
  });

  return {
    url: result.url,
    type,
    uploadedAt: new Date().toISOString(),
  };
}
