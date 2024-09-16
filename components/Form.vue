
<template>
  <div class="feedback-form">
    <div class="feedback-form__heading">
      <h2>{{ title }}</h2>
    </div>
    <Form
      ref="form"
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
      class="feedback-form__container"
    >
    <div class="form-half">
      <div class="form-block">
        <TextInput
          name="name"
          type="text"
          label="Full Name"
          placeholder="Your Name"
          success-message="Nice to meet you!"
        />
      </div>
      <div class="form-block">
        <TextInput
          name="phone"
          type="tel"
          label="Phone"
          placeholder="Your phone number"
          success-message="Got it!"
        />
      </div>
      <div class="form-block">
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="Your email"
          success-message="Got it!"
        />
      </div>
      <div class="form-block">
        <TextInput
          name="persons"
          type="number-range"
          label="Persons"
          placeholder="Persons number"
          success-message="Got it!"
        />
      </div>
    </div>
    <div class="form-half">
      <div class="form-block">
        <TextInput
          name="date"
          type="datepicker"
          label="Select date"
          placeholder="Persons number"
          success-message="Got it!"
        />
      </div>
      <div class="form-block">
        <TextInput
          name="time"
          type="select"
          label="Select time"
          placeholder="Persons number"
          success-message="Got it!"
        />
      </div>
      <div class="form-block">
        <TextInput
          name="message"
          type="textarea"
          label="Message"
          placeholder="Your comment"
          success-message="Thank you!"
        />
      </div>
      <button class="btn w-100 black submit-btn" type="submit">Submit</button>
    </div>
    </Form>
  </div>
</template>

<script setup>
import { Form, useField, ErrorMessage } from "vee-validate";
import { useReservationStore } from "@/store/reservation";
const storeReservaton = useReservationStore();
const props = defineProps(["mode", "title"]);

const file = useField("file");
const filename = ref(undefined);
const date = ref();
const time = ref();

const schema = {
  name(value) {
    if (value?.length >= 2) return true;
    return "Name needs to be at least 2 characters.";
  },
  phone(value) {
    if (value?.length > 6 && /[0-9-]+/.test(value)) return true;
    return "Phone number needs to be at least 6 digits.";
  },
  email(value) {
    if (value) {
      if (value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return true;
      return "The email field must be a valid email.";
    }

  },
  persons(value) {
    if (value) return true;
    return "Choose persons count";
  },
  date(value) {
    if (value) return true;
    return "Select date";
  },
  time(value) {
    if (value) return true;
    return "Select time";
  },
};

async function onSubmit(values, { resetForm }) {
  await storeReservaton.postData(values)
  resetForm();
}

function onInvalidSubmit() {
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.classList.add("invalid");
  setTimeout(() => {
    submitBtn.classList.remove("invalid");
  }, 1000);
}

const selectTime = (event) => {
  time = event;
};

</script>


<style lang="scss">
@import "assets/scss/variables.scss";

.feedback-form {

  @include for-phone-only {
    width: 100%;
    max-width: 100%;
  }

  @include for-tablet-portrait-up {
    width: 100%;
    max-width: 1200px;
  }

  @include for-700-height-only {
    width: 100%;
    max-width: 1200px;
  }

  &__heading {
    letter-spacing: 1px;
    font-weight: 400;
    line-height: 1.45;
    text-align: left;
    margin: 0px 0 2rem;

    @include for-phone-only {
      font-size: 1.15rem;
    }

    @include for-tablet-portrait-up {
      font-size: 1.25rem;
    }

    @include for-desktop-up {
      font-size: 1.75rem;
    }

    @include for-big-desktop-up {
      font-size: 2rem;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding: 0 0px;

    @include for-phone-only {
      flex-direction: column;
      padding-bottom: 2rem;
    }

    @include for-tablet-portrait-up {
      flex-direction: row;
    }

    // @include for-700-height-only {
    //   flex-direction: row;
    // }

    .form-half {
      padding: 0 1rem;
      flex-basis: 50%;
    }

    .errors {
      position: relative;
    }

    .errors ul,
    .errors {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-size: 14px;
      line-height: 20px;
    }

    .field.has-error label,
    .field.has-error a {
      color: #dc3545 !important;
    }

    .field.has-error input {
      border: 1px solid #dc3545 !important;
      background: rgba(246, 102, 102, 0.25);
    }

    .field .error {
      display: none;
      color: #dc3545 !important;
    }

    /////@extend

    ::placeholder {
      color: rgba(255, 255, 255, 0.75);
      font-size: 1rem;

      @include for-phone-only {
        font-size: 1rem;
      }

      @include for-tablet-portrait-up {
        font-size: 1rem;
      }
    }
  }

  .form-block {
    margin-bottom: 1rem;
  }

  &__footer {
    justify-content: flex-end !important;
    margin-top: 0.25rem;
  }

  .alright {
    @include for-phone-only {
      font-size: 0.65rem;
      line-height: 1.15;
      margin-top: 0.75rem;
    }

    @include for-tablet-portrait-up {
      font-size: 0.65rem;
      line-height: 1.25;
      margin-top: 1rem;
    }

    @include for-700-height-only {
      margin-top: 0.25rem;
    }
  }


  .field.has-error .error {
    display: block;
  }
}

form {
  width: 100%;
  margin: 0px auto;
  padding-bottom: 60px;
}

.submit-btn {
  display: block;
  padding: 1.25rem 1rem;
  width: 100%;
  border-radius: 0px;
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
  &.invalid {
    animation: shake 0.5s;
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}

.submit-btn:hover {
  //transform: scale(1.1);
}

////

.v-input__details {
  display: none !important;
}

input.dp__input {
  padding: 15px 10px 15px 40px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: $font-sans;
}
.dp__input_icon {
  width: 1.25rem;
  height: 1.25rem;
}

.v-number-input__control .v-btn.v-btn--density-default, .v-number-input__control .v-btn {
  height: 100%!important;
}

////

input.dp__input, .v-field, input, textarea {
    border-radius: 0px!important;
}

.has-error {
  .dp__input{
    background-color: $colorErrorBg!important;
  }
}

</style>
