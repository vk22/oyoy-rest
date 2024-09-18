<template>
  <section class="wine-list index-section">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h2>Wine List</h2>
            <p>Complementing your exquisite meal with a nice selection of wines from various parts of the world. Carefully chosen to satisfy everyone’s taste buds, from wine connoisseurs to a beginner wine enthusiast.</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <div class="wine-list-link">
            <a href="/menu/wine-list.pdf" target="_blank">
              <img src="/menu/wine-list.jpg" alt="">
            </a>
            <a href="/menu/wine-list.pdf" target="_blank">
              <div class="btn2" @click="getFormModalStateToggle">See Wine List</div>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.wine-list {
  background: #fff;
  padding: 4rem;
  .wine-list-sections-nav {
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    .item {
      text-transform: uppercase;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      font-size: .9rem;
      font-weight: 500;
      margin: 5px 0;

      .text {
        color: #666;
        padding: 0 .35rem;
        border-radius: 0px;
        // transform: skewX(-20deg);
      }

      .arrow {
        margin: 0 .5rem;
        color: #c1c1c1;
      }
      &.active {
        &.food {
          .text {
            color: #fff;
            background: #af8e72;
          }
        }
        &.drinks {
          .text {
            color: #fff;
            background: #b35f7c;
          }
        }

      }
    }
  }
  .wine-list-link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 275px;
      border-radius: 6px;
      box-shadow: 1px 1px 10px rgba($color: #000000, $alpha: 0.25);
      @include base-transition(all, .15s);
      margin-bottom: 2rem;

      &:hover {
        box-shadow: 1px 1px 20px rgba($color: #000000, $alpha: 0.25);
        transform: translateY(-2px);
      }
    }
  }
  .wine-list-image {
    
    @include for-phone-only {    
      padding: 0rem 3rem;
      display: none;
    }
    @include for-tablet-portrait-up {
      padding: 1rem 3rem 0;
    }
    img {
    }
  }
}
</style>
