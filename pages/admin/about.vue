<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>About</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="about.title" variant="outlined" label="Title" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <v-textarea v-model="about.text" variant="outlined" label="Text" density="compact"></v-textarea> -->
          <AdminTiptapEditor v-model="about.text"></AdminTiptapEditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col> 
          <div class="admin-main-btn mr-2" @click="save()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const about = ref();

const { data } = await useFetch("/api/about", {
  method: "get",
});
console.log("data ", data);
about.value = data._rawValue.data;

function textUpdate(text) {
  about.value.text = text
}

const save = async () => {
  const { data } = await useFetch(`/api/about`, {
    method: "put",
    body: about,
  });
  console.log("data ", data);
};

//store.autoGalleryStart()
</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.reservation-panel {
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
  margin-top: 1rem;
  &__header {
    background: #f0f0f0;
    margin-bottom: 0rem;
    border-radius: 4px;
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
