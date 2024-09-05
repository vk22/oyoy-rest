<template>
  <nav class="sidebar">
    <div class="sidebar__logo">
      <nuxt-link :to="'/admin/reservations'" class="">
        <img src="/img/logo.svg" class="dark-logo" />
      </nuxt-link>
    </div>
    <ul class="sidebar__menu">
      <li v-for="(link, index) in menuItems" :key="index" class="menu-item">
        <nuxt-link :to="link.route" class="">
          <v-icon :icon="link.icon"></v-icon>
          <span>{{ link.name }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div class="sidebar__bottom">
      <div class="sidebar-tools"></div>
    </div>
  </nav>
</template>

<script>

export default {
  layout: "admin",
  middleware: ["auth"],
  components: {},
  data() {
    return {
      menuItems: [
        {
          name: "Reservations",
          route: "/admin/reservations",
          icon: "mdi-basket",
        },
        {
          name: "Events",
          route: "/admin/events",
          icon: "mdi-format-list-bulleted",
        },
        {
          name: "Gallery",
          route: "/admin/gallery",
          icon: "mdi-format-list-bulleted",
        },
        {
          name: "Menu",
          route: "/admin/menu",
          icon: "mdi-format-list-bulleted",
        },
        {
          name: 'Company',
          route: '/admin/company',
          icon: 'mdi-format-list-bulleted'
        },
        {
          name: 'Top slider',
          route: '/admin/topslider',
          icon: 'mdi-format-list-bulleted'
        },
        {
          name: 'About',
          route: '/admin/about',
          icon: 'mdi-format-list-bulleted'
        },
      ],
      navRightIsActive: false,
      toggleNavStyle: "",
    };
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {
    $route(to, from) {
      //this.$store.dispatch('popupToggle', false)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.sidebar {
  position: fixed;
  top: 0;
  z-index: 999;
  height: calc(100vh);
  width: 250px;
  background: $colorBlue;

  &__logo {
    list-style: none;
    margin: 0;
    padding: 2rem 2rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;

    img {
      width: 85%;
    }

    a {
      color: #111;
      width: 100%;

      &:hover {
        color: #000;
        text-decoration: none;
      }
    }
  }

  &__menu {
    list-style: none;
    margin: 0;
    padding: 0;
    // border-top: 1px solid #E6EAEA;
  }

  .menu-item {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #fff;
    padding: 0 1rem;
    margin-bottom: 1px;

    a {
      font-weight: 400;
      width: 100%;
      display: block;
      opacity: 0.85;
      transition: opacity 0.2s ease-in-out;
      color: #ddd;
      padding: 0.65rem 1rem;
      border-radius: 6px;

      &:hover {
        background: $mainColorHover;
        text-decoration: none;
        opacity: 1;
      }

      &.nuxt-link-exact-active {
        font-weight: 400;
        background: $mainColorHover;
        color: #fff;
        opacity: 1;
      }
      span {
        margin-left: 1rem;
      }
    }
  }

  &__bottom {
    position: absolute;
    bottom: 0rem;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    transition: bottom 0.2s ease-in-out;
    display: flex;
    flex-direction: column;

    .btn {
      width: 100%;
      margin-top: 0.5rem;
    }

    &.up {
      bottom: 3rem;
    }

    .sidebar-tools {
      margin: 1rem 0;
    }

    .tracks-stats {
      margin: 0.5rem 0;
      span {
        font-weight: 500;
      }
    }

    .storage-space {
      width: 100%;
      margin-bottom: 1rem;

      &__bar {
        position: relative;
        top: 3px;
        cursor: pointer;
        width: 100%;
        height: 5px;
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 0.9;
      }
      &__progress {
        position: relative;
        top: -2px;
        left: 0px;
        width: 0%;
        height: 5px;
        background-color: #0b00b1;
        z-index: -1;
      }
    }
    .storage-info {
      margin: 0.5rem 0;
      span {
        font-weight: 500;
      }
    }
  }
}

.app-container {
  width: calc(100vw - 260px);
  margin-left: 260px;
  padding: 6rem 1rem 8rem;

  .container {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
