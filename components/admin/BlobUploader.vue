<template>
  <div>
    <h1>Загрузить файл</h1>
    <input type="file" ref="fileInput" />
    <button @click="handleSubmit">Загрузить</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fileUrl: null,
    };
  },
  methods: {
    async handleSubmit() {
      const file = this.$refs.fileInput.files[0];

      if (!file) return;

      try {

        const response = await axios.post('/api/upload-blob', { file });
        console.log('response ', response.data)


        // const uploadResponse = await axios.put(response.data.url, file, {
        //   headers: {
        //     'Content-Type': file.type,
        //   },
        // });


        // this.fileUrl = uploadResponse.data.url;
      } catch (error) {
        console.error('Ошибка загрузки', error.message);
      }
    },
  },
};
</script>
