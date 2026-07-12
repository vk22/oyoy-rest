<template>
  <footer>
    <div class="left">
      <div>
        <div class="address">
          <div>94 Triq Spinola St, <br />Saint Julian's, <br />Malta</div>
        </div>
        <div class="map">
          <v-icon icon="mdi-map-marker"></v-icon>
          <a
            class="btn-link"
            href="https://www.google.com/maps/place/OyOy+Bar/@35.919872,14.492764,18z/data=!4m6!3m5!1s0x130e45c8ce17dbff:0xdaa73ebf3a91c9bd!8m2!3d35.9196351!4d14.4926563!16s%2Fg%2F11ryrfcfkx?hl=ru-RU&entry=ttu"
            target="_blank"
            >See on map</a
          >
        </div>
      </div>
      <div>
        <div class="phone">
          <a :href="'tel:' + company.phone"
            ><v-icon icon="mdi-phone"></v-icon>
            <span>{{ company.phone }}</span></a
          >
        </div>
        <div class="mail">
          <v-icon icon="mdi-email"></v-icon>
          <a :href="'mailto:' + company.email">{{ company.email }}</a>
        </div>
        <div class="map"></div>
      </div>
    </div>
    <div class="center">
      <div class="logo">
        <img src="/img/logo-b.svg" alt="" />
      </div>
      <div class="social">
        <a
          class="social-icon icon-inst"
          href="https://www.instagram.com/oyoyrestaurant?igsh=M3h3NDcyMml6MGp2"
          target="_blank"
        ></a>
        <a
          class="social-icon icon-fb"
          href="https://www.facebook.com/oyoy.mlt"
          target="_blank"
        ></a>
        <div class="social-icon icon-spotify"></div>
        <div class="social-icon icon-tiktok"></div>
      </div>
    </div>
    <div class="right">
      <div class="nav" v-if="navigation.length">
        <ul>
          <li v-for="(item, index) in navigation" :key="index">
            <!-- <a
              v-if="item"
              class="menu-item"
              :key="item.href"
              :href="item.href"
              :data-href="item.href"
            >
              {{ item.text }}
            </a> -->
            <span v-if="item">
              <NuxtLink
                v-if="item.isHomePageAnchor"
                class="menu-item"
                :to="{ path: '/', hash: item.href }"
              >
                {{ item.text }}
              </NuxtLink>
              <NuxtLink
                v-else
                class="menu-item"
                :to="{ path: '/' + item.href }"
              >
                {{ item.text }}
              </NuxtLink>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <router-link to="/privacy" target="_blank"
                >Privacy Policy</router-link
              >
            </div>
            <div>
              <router-link to="/terms" target="_blank"
                >Terms & Conditions</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useNavigationStore } from "@/store/nav";
import { useCompanyStore } from "@/store/company";
/// menu
const navStore = useNavigationStore();
const navigation = computed(() => navStore.getItems);
//// getcompany
const companyStore = useCompanyStore();
const company = companyStore.getCompany;

////
function manualSmoothScroll(event) {
  event.preventDefault();
  const id = event.target.dataset.href;
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;
  const yOffset = -100;
  const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });

  setTimeout(() => {
    toggleMenu();
  }, 500);
}

onMounted(() => {
  document.querySelectorAll(".nav .menu-item").forEach((link, index) => {
    link.addEventListener("click", manualSmoothScroll);
  });
});
</script>

<style lang="scss" scoped>
footer {
  background-color: #ebedf0;
  display: flex;
  justify-content: space-between;
  color: #393939;
  font-size: 0.9rem;

  @include for-phone-only {
    padding: 2rem;
    padding-bottom: 7rem;
    flex-direction: column;
  }

  @include for-tablet-portrait-up {
    padding: 2rem;
  }

  a {
    text-decoration: none;
    color: #393939;
  }

  .left,
  .right {
    
      @include for-phone-only {
        width: 100%;
      }

      @include for-tablet-portrait-up {
        width: 300px;
      }
  }

  .left {
    @include for-phone-only {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    @include for-tablet-portrait-up {
      text-align: left;
    }
    & > div {
      margin-bottom: 1.5rem;

      @include for-phone-only {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      @include for-tablet-portrait-up {
        text-align: left;
      }
    }

    .address {
      font-size: 1.1rem;
      color: #565656;
      margin-bottom: 1.5rem;
    }

    .phone,
    .mail,
    .map {
      line-height: 1.75rem;
      display: flex;
      align-items: center;
      font-size: 0.9rem;

      i {
        font-size: 20px;
        margin-right: 0.5rem;
      }

      a {
        text-decoration: none;
        color: #393939;
      }
    }

    .phone {
      @include for-phone-only {
        margin-bottom: 1.5rem;
      }
      @include for-tablet-portrait-up {
       margin-bottom: 0.25rem;
      }
    }
  }

  .logo {
    margin-bottom: 1.5rem;

    @include for-phone-only {
      width: 140px;
      margin-top: 1.5rem;
    }

    @include for-tablet-portrait-up {
      width: 160px;
    }
  }

  .social {
    display: flex;
    justify-content: center;

    .social-icon {
      background-size: 100%;
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
      margin: 0.5rem;
    }
    .icon-inst {
      background-image: url("/img/icon-inst-b.svg");
    }
    .icon-fb {
      background-image: url("/img/icon-fb-b.svg");
    }
    .icon-spotify {
      background-image: url("/img/icon-spotify.svg");
    }
    .icon-tiktok {
      background-image: url("/img/icon-tiktok.svg");
    }
  }

  .right {
    @include for-phone-only {
      display: none;
    }

    @include for-tablet-portrait-up {
      display: block;
    }
    .nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin: 0;
      ul {
        margin-bottom: 1rem;
        li {
          display: block;
          text-align: right;
          a {
            text-decoration: none;
            font-weight: 400;
          }
        }
      }
    }
  }

  .center {
    @include for-phone-only {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
