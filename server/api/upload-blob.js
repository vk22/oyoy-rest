// server/api/upload.js
import { handleUpload } from '@vercel/blob/client';
import { auth, canUpload } from './auth'; // Импортировать логику аутентификации и проверки прав

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event); // Чтение тела запроса
    const formData = await readFormData(event);
    console.log('body ', body)
    console.log('event.req ', event)
    try {
      const jsonResponse = await handleUpload({
        body,
        request: event.req, // Передаем запрос
        onBeforeGenerateToken: async (pathname) => {
          // Логика для генерации токена (авторизация пользователя)
          const user = await auth(event);
          // const userCanUpload = canUpload(user, pathname);

          // if (!userCanUpload) {
          //   throw new Error('Not authorized');
          // }

          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
            tokenPayload: JSON.stringify({
              // Добавляем данные пользователя в токен (например, userId)
              userId: user.id,
            }),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          // Логика после завершения загрузки файла
          console.log('File upload completed', blob, tokenPayload);

          try {
            const { userId } = JSON.parse(tokenPayload);
            // Можешь обновить данные пользователя, например, в БД
            // await db.update({ avatar: blob.url, userId });
          } catch (error) {
            console.error('Error updating user', error);
            throw new Error('Could not update user');
          }
        },
      });

      // Возвращаем ответ клиенту
      return jsonResponse;
    } catch (error) {
      return { error: error.message };
    }
  } else {
    return { error: 'Method Not Allowed' };
  }
});
