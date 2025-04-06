<template>
  <v-dialog v-model="dialogIsOpen" persistent max-width="600px">
    <v-card class="subscribers-panel">
      <v-container>
        <v-row>
          <v-col>
          </v-col>
        </v-row>
        <div class="subscribers-panel__content">
          <v-row>
            <v-col cols="3">
              <span>Name:</span>
            </v-col>
            <v-col><span>{{ selected.name }}</span></v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Email:</span>
            </v-col>
            <v-col>
              <span>{{ selected.email }}</span>
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-card-actions class="pr-4">
        <v-spacer></v-spacer>
        <div variant="outlined" class="btn admin-sm-btn" @click="dialogIsOpen = false">
          Cancel
        </div>
        <div variant="outlined" class="btn admin-sm-btn ml-3" @click="deleteItem(selected)">
          Delete
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Subscribers</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="upload-file-container">
            <AdminFileUploader :type="'svg'" @files-dropped2="addFile" ref="uploaderRef"></AdminFileUploader>
            <div class="mt-3">
              <button class="admin-sm-btn" @click="uploadFile">Upload</button>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="orders-table">
            <v-row class="orders-table__header">
              <!-- <v-col cols="1"></v-col> -->
              <v-col cols="3">Name</v-col>
              <v-col cols="3">Email</v-col>
              <v-col cols="3">Date</v-col>
              <v-col cols="3">Time</v-col>
            </v-row>
            <div class="orders-table__item" v-for="(item, index) in subscribers" :key="index" @click="selectItem(item)">
              <v-row>
                <!-- <v-col cols="1"><v-checkbox></v-checkbox></v-col> -->
                <v-col cols="3">{{ item.name }}</v-col>
                <v-col cols="3">{{ item.email }}</v-col>
                <v-col cols="3"> {{ item.date }}</v-col>
                <v-col cols="3">{{ item.time }}</v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { $formatDate } = useNuxtApp();
const dialogIsOpen = ref(false);
const selected = ref();
const subscribers = ref();
const uploaderRef = ref(null);

const { data } = await useFetch("/api/subscribers", {
  method: "get",
});
console.log("data.value ", data.value);
subscribers.value = data.value.subscribers;

const selectItem = (item) => {
  selected.value = item;
  dialogIsOpen.value = true;
};
const deleteItem = async (item) => {
  const { data } = await useFetch(`/api/subscribers`, {
    method: "delete",
    body: item,
  });
  if (data._rawValue.success) {
    dialogIsOpen.value = false;
    subscribers.value = data.value.subscribers;
  }
  //
};

/// File Upload

const file = ref('')

function addFile(file) {
  console.log('file ', file)
}

async function uploadFile() {
  let filesUploadResponse = await uploaderRef.value.startUpload();
  console.log('filesUploadResponse ', filesUploadResponse)
}

//store.autoGalleryStart()
</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.upload-file-container {
  margin-bottom: 1rem;
}

.subscribers-panel {
  font-family: $font-sans;
  padding: 1rem;

  h1,
  h2,
  h3 {
    font-family: $font-sans;
    color: #111;
    font-weight: 600;
  }

  &__header {
    border-bottom: 1px solid #e2e2e2;
    margin-bottom: 1rem;
  }

  &__content {
    .v-col:nth-child(2) {
      span {
        font-weight: 500;
        display: inline-block;
      }
    }
  }
}

.orders-table {
  padding: 0 1rem;
  margin-top: 1rem;

  &__header {
    background: $colorBlue;
    margin-bottom: 0rem;
    border-radius: 4px;
    color: #fff;
  }

  &__item {
    cursor: pointer;
    padding: 1rem;
    margin: 0 -12px;
    border-bottom: 1px solid #f5f5f5;

    &:hover {
      background: #f5f5f5;
    }

    .v-col {
      display: flex;
      align-items: center;
    }
  }
}
</style>
