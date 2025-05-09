<template>
  <v-dialog v-model="reservationDialogIsOpen" persistent max-width="600px">
    <v-card class="reservation-panel">
      <v-container>
        <v-row>
          <v-col>
            <!-- <div class="reservation-panel__header">  
              <h3>Reservation</h3>
            </div> -->
          </v-col>
        </v-row>
        <div class="reservation-panel__content">
          <v-row>
            <v-col cols="3">
              <span>Name:</span>
            </v-col>
            <v-col
              ><span>{{ reservationSelected.name }}</span></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Phone:</span>
            </v-col>
            <v-col>
              <span>{{ reservationSelected.phone }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Email:</span>
            </v-col>
            <v-col>
              <span>{{ reservationSelected.email }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Persons:</span>
            </v-col>
            <v-col>
              <span>{{ reservationSelected.persons }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Message:</span>
            </v-col>
            <v-col>
              <span>{{ reservationSelected.message }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <span>Date/Time:</span>
            </v-col>
            <v-col>
              <span
                >{{ reservationSelected.date }} /
                {{ reservationSelected.time }}</span
              >
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-card-actions class="reservation-panel__actions">
        <v-spacer></v-spacer>
        <div
          variant="outlined"
          class="btn admin-sm-btn"
          @click="reservationDialogIsOpen = false"
        >
          Cancel
        </div>
        <div
          variant="outlined"
          class="btn admin-sm-btn ml-3 red"
          @click="deleteItem(reservationSelected)"
        >
          Delete
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title" v-if="reservationItems">
            <h1>Reservations ({{reservationItems.length}})</h1>
            <div class="reservation-check" v-if="reservationCheckboxShow">
              <v-checkbox
                v-model="reservationAvailable.isAvailable"
                label="Reservations Enabled"
              ></v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="orders-table">
        <v-row class="orders-table__header">
          <!-- <v-col cols="1"></v-col> -->
          <v-col cols="2">Name</v-col>
          <v-col cols="2">Phone</v-col>
          <v-col cols="2">Email</v-col>
          <v-col cols="2">Persons</v-col>
          <v-col cols="2">Message</v-col>
          <v-col cols="1">Date</v-col>
          <v-col cols="1">Time</v-col>
        </v-row>
        <div
          class="orders-table__item"
          v-for="(item, index) in reservationItems"
          :key="index"
          @click="selectItem(item)"
        >
          <v-row>
            <!-- <v-col cols="1"><v-checkbox></v-checkbox></v-col> -->
            <v-col cols="2">{{ item.name }}</v-col>
            <v-col cols="2">{{ item.phone }}</v-col>
            <v-col cols="2">{{ item.email }}</v-col>
            <v-col cols="2">{{ item.persons }}</v-col>
            <v-col cols="2"> {{ item.message }}</v-col>
            <v-col cols="1"> {{ item.date }}</v-col>
            <v-col cols="1">{{ item.time }}</v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
import { onMounted, ref, watch } from "vue";
import { useAdminStore } from "@/store/admin";
import { useConfirm } from '../../compositions/useConfirm';
const { isConfirmed } = useConfirm();
const { $formatDate } = useNuxtApp();
const reservationDialogIsOpen = ref(false);
const reservationSelected = ref();
const reservationItems = ref();
const reservationAvailable = ref(undefined);
const reservationCheckboxShow = ref(false);
const adminStore = useAdminStore();

const getReservationAvailableState = async () => {
  const { data } = await useFetch("/api/reservation-available", {
    method: "GET",
  });
  reservationAvailable.value = data.value.data;
  reservationCheckboxShow.value = true;
};

const setReservationAvailableState = async () => {
  await adminStore.fetchData('reservation-available', 'put', reservationAvailable)
}

const getReservationsList = async () => {
  const { data } = await useFetch("/api/reservations", {
    method: "get",
  });
  reservationItems.value = data.value.reservations;
  reservationItems.value.map((item) => {
    item.date = $formatDate(item.date);
  });
};

const selectItem = (item) => {
  reservationSelected.value = item;
  reservationDialogIsOpen.value = true;
};
const deleteItem = async (item) => {
  if (await isConfirmed()) {
    const { data } = await useFetch(`/api/reservations`, {
      method: "delete",
      body: item,
    });
    if (data._rawValue.success) {
      reservationDialogIsOpen.value = false;
      reservationItems.value = data.value.reservations;
    }
  }

  //
};

getReservationAvailableState()
getReservationsList()

watch(() => reservationAvailable, () => {
  setReservationAvailableState()
}, {
  deep: true
});

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.reservation-panel {
  font-family: $font-sans;
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
    padding: 1rem;
    .v-col:nth-child(2) {
      span {
        font-weight: 500;
        display: inline-block;
      }
    }
  }
  &__actions {
    border-top: 1px solid #ddd;
    padding: 1rem;
  }
}

.orders-table {
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
