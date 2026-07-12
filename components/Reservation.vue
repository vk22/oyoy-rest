<template>
  <div class="reservation-page">
    <div class="reservation-page__container">
      <h2>Reservations</h2>
      <iframe
        src="https://widget.thefork.com/909e5f74-34a8-4e9a-be75-6a834b42e5f4"
        allow="payment *"
        style="width: 100%; min-height:800px; border:none; overflow:scroll;"
      ></iframe>
    </div>
  </div>
</template>

    
<style lang="scss" scoped>


.reservation-page {
  position: relative;
  background: #fff;

  @include for-phone-only {
    padding-top: 5.5rem;
  }

  @include for-tablet-portrait-up {
    padding-top: 10rem;
  }

  h2 {
    
    @include for-phone-only {
      font-size: 2.75rem;
    }

    @include for-tablet-portrait-up {
      padding-top: 10rem;
    }
  }
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;

    @include for-phone-only {
      padding-top: 2rem;
      align-items: center;
      justify-content: center;
    }

    @include for-tablet-portrait-up {
      padding-top: 0rem;
      align-items: center;
      justify-content: center;
    }

    .reservation-empty {
      padding: 3rem;
    }
  }

  .form-title {
    font-family: $font-serif;
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;

    @include for-phone-only {
      font-size: 3rem;
      text-align: left;
      margin-bottom: 0rem;
    }

    @include for-tablet-portrait-up {
      font-size: 4rem;
    }
  }
}

.overlay {
  // background: #0d6b80ba;
  // background: #002229ba;
  background-color: rgba($color: #000000, $alpha: 0.3);
  background-image: radial-gradient(at center, #3e3e3e26 20%, #2c3238b7 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

iframe {
  border: none;

  @include for-phone-only {
    min-height: 850px;
    height: 100%;
  }

  @include for-tablet-portrait-up {
    min-height: 850px;
    height: 850px;
  }
}
</style>
