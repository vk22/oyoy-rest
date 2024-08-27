<template>
  <section class="login-page">
    <div>
      <div class="login-form">
        <div class="field">
          <input
            class="input"
            id="username"
            v-model="user.username"
            type="text"
            :placeholder="'Username'"
          />
        </div>
        <div class="field">
          <input
            class="input"
            id="pw"
            v-model="user.password"
            type="password"
            :placeholder="'Password'"
          />
        </div>
        <div class="field">
          <button @click="login" class="main-btn">Login</button>
        </div>
      </div>
    </div>
  </section>

</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticateUser } = useAuthStore(); // use auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const user = ref({
  username: '',
  password: '',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/reservations');
  }
};
</script>

<style lang="scss">
@import "assets/scss/main.scss";

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  .login-form {
    width: 250px;
    text-align: left;

    input {
      display: block;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #333;
      // background-color: #ffffff40;
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid #999;
      //border-bottom: 1px solid #909090;
      box-shadow: none;
      padding: 1rem 1rem;
      border-radius: 4px;
      width: 100%;
      max-width: 100%;
      font-size: 1rem;

      @include for-700-height-only {
        padding: 1rem 0.75rem;
      }

      &:focus {
        outline: none;
      }
    }

    .main-btn {
      display: block;
      padding: 1rem 1rem;
      width: 100%;
      border-radius: 4px;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #fff;
      cursor: pointer;
      transition-property: all;
      transition-duration: 0.25s;
      transition-timing-function: ease-out;
      background-color: $mainColor;
      border: 1px solid $mainColor;

      @include for-700-height-only {
        padding: 1rem 0.75rem;
      }

      &:hover {
        background-color: $mainColorHover;
        border: 1px solid $mainColorHover;
        color: #fff;
      }

      &:disabled {
        opacity: 0.75;

        &:hover {
          background-color: $mainColor;
          color: #fff;
          cursor: default;
        }
      }
    }

    .field {
      width: 100%;
      margin-bottom: 0.75rem;

      @include for-700-height-only {
        margin-bottom: 0.35rem;
      }
      @include for-800-height-only {
        margin-bottom: 0.35rem;
      }
    }

    .errors {
      position: relative;
    }

    .errors ul,
    .errors {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #dc3545;
      font-size: 13px;
    }
  }

  .btn {
    width: 100%;
  }
}
</style>