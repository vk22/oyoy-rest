<template>
  <section class="index-section article-index">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h2>Exceptional gastronomy in beautiful place</h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="img-wrap img-1 slideUp fade-in">
            <img src="/img/article-prev.jpg" />
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-wrap">
            <p>
              Culinary art is an important part of the unforgettable experience
              prepared for each of you. The world full taste is an endless
              inspiration for our chef and his team. Traditional recipes. Quality
              seasonal products. See. To feel. Enjoy it. And let yourself be
              pampered. This is gastronomy at Hotel & Spa Resort Kaskady.
            </p>
            <p>
              Culinary art is an important part of the unforgettable experience
              prepared for each of you. The world full taste is an endless
              inspiration for our chef and his team. Traditional recipes. Quality
              seasonal products. See. To feel. Enjoy it. And let yourself be
              pampered. This is gastronomy at Hotel & Spa Resort Kaskady.
            </p>
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

.article-index {
  display: flex;
  // margin: 0 auto;
  background: #fff;

  .v-container {
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
  }



  .section-title {
    h2 {
      max-width: 700px;
      width: 100%;
      text-align: center;
      margin: auto;
      
      @include for-phone-only {    
        margin-bottom: 1rem;
      }
      @include for-tablet-portrait-up {
        margin-bottom: 3rem;
      }
    }
  }

  .img-wrap {
    @include for-phone-only {    
      padding: 0 5rem;
    }
    @include for-tablet-portrait-up {
      padding-right: 2rem;
    }
  }

  .text-wrap {
    @include for-phone-only {    
      padding: 0 0rem;
    }
    @include for-tablet-portrait-up {
      padding: 0 2rem;
    }
  }

}
</style>
