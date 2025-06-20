import { handleUpload } from '@vercel/blob/client';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const req = event.node.req;

  return await handleUpload({
    body,
    request: req,
    token: config.vercelBlobToken, // ⚠️ обязательно локально
    onBeforeGenerateToken: async () => ({
      access: 'public',
      maximumSizeInBytes: 50 * 1024 * 1024, // 50MB
      allowedContentTypes: [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'video/mp4',
        'application/zip',
        'text/plain',
        'application/octet-stream'
      ],
    }),
  });
});
