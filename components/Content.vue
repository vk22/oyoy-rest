<template>
  <div class="content">
    <!-- Top Banner -->
    <section class="about text-r" id="about">
      
      <div class="col col-img">
        <div class="img-wrap">
          <img src="/img/about-1.jpg" alt="">
        </div>
      </div>
      
      <div class="col col-text">
        <div class="text-wrap fadeIn-2">
          <h2>About us</h2>
          <div class="text-accent">
            <p>
              Welcome to VRV Global Logistics Inc, your trusted partner in seamless car transportation across the USA. With a commitment to reliability and excellence, we specialize in transporting vehicles of all types, ensuring a safe and timely delivery.
            </p>
          </div>
          <div class="text">
            <p>
              At VRV Global Logistics Inc., we redefine car transportation by embracing the future. Join us on this exciting journey where cryptocurrency, blockchain, and transportation converge seamlessly. Explore a new era in logistics – where innovation drives every mile.
            </p>
          </div>
        </div>
      </div>

    </section>
    <Advantages></Advantages>
    <section class="about text-l">
      <div class="col col-text">
        <div class="text-wrap fadeIn-2">
          <h2>Work with us</h2>
          <div class="text-accent">
            <p>
              Our drivers are a special pride and treasure! At the company, we have the utmost respect for our unrivaled staff of professional drivers. We are convinced that they are not just drivers, but true heroes on the road.
            </p>
          </div>
          <div class="text">
            <p>
              Their dedication, skill and reliability are the cornerstones of our operations. We value each driver for their hard work, dedication and ability to handle any challenges that may arise on the road. It is because of our drivers that we are able to provide the highest standard of service to our customers.
            </p>
            <p>
              They are an indispensable part of our team and a key element of our success. Thanks to our drivers, we can proudly claim that we are not just moving vehicles from point "A" to point "B", but that we embody quality, reliability and professionalism.
            </p>
          </div>
        </div>
      </div>
      <div class="col col-img">
        <div class="img-wrap">
          <img src="/img/about-2.jpg" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script setup> 

const target = document.getElementById('about');
console.log('target ', target)

</script>

<style lang="scss">
@import "assets/scss/main.scss";

.about {
  display: flex;

  @include for-phone-only {
    margin-bottom: 0rem;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 0rem;
  }

  @include for-desktop-up {
    margin-bottom: 6rem;
  }

  &.text-r {
    @include for-phone-only {
      flex-direction: column-reverse;
    }

    @include for-tablet-portrait-up {
      flex-direction: column-reverse;
    }

    @include for-desktop-up {
      flex-direction: row;
    }
  }

  &.text-l {
    @include for-phone-only {
      flex-direction: column;
    }

    @include for-tablet-portrait-up {
      flex-direction: column;
    }

    @include for-desktop-up {
      flex-direction: row;
    }
  }


  
  .col  {
    position: relative;
  
    @include for-phone-only {
      width: 100%;
    }

    @include for-tablet-portrait-up {
      width: 100%;
    }

    @include for-desktop-up {
      width: 50%;
    }

    @include for-big-desktop-up {

    }

    @include for-700-height-only {

    }

    @include for-800-height-only {

    }
  }
  
  .col-img {

    @include for-phone-only {
      height: 500px;
    }

    @include for-tablet-portrait-up {
      height: 500px;
    }

    @include for-desktop-up {
      height: 750px;
    }
    
    .img-wrap { 
      background-color: #021D40;
      position: relative;
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 5rem 0;

      @include for-phone-only {
        background-color: #021D40;
        width: 100%;
        justify-content: center;
      }

      @include for-tablet-portrait-up {
        background-color: #021D40;
        width: 100%;
        justify-content: center;
      }

      @include for-desktop-up {
        background-color: #021D40;
        width: 80%;
        justify-content: flex-end;
      }

      img {
        position: relative;
        width: 400px;
        transform: translateX(10rem);

        @include for-phone-only {
          border: none;
          height: 100%;
          left: 0;
          -o-object-fit: cover;
          object-fit: cover;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 10;
          transform: translateX(0rem);
        }

        @include for-tablet-portrait-up {
          border: none;
          height: 100%;
          min-height: 500px;
          left: 0;
          -o-object-fit: cover;
          object-fit: cover;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 10;
          transform: translateX(0rem);
        }

        @include for-desktop-up {
          border: none;
          height: 100%;
          min-height: 500px;
          left: 0;
          position: relative;
          top: 0;
          width: 500px;
          z-index: 10;
          transform: translateX(10rem);
        }

      }
    }
  }
  
  .col-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @include for-phone-only {
      align-items: center;
      padding: 2.5rem;
    }

    @include for-tablet-portrait-up {
      align-items: center;
      padding: 2.5rem;
    }

    @include for-desktop-up {
      align-items: flex-start;
      padding: 5rem;
    }

    .text-wrap {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      max-width: 550px;
      width: 100%;
    }

    .text-accent {
      margin-bottom: 1rem;
    }
  }

  &.text-l {
    .col-img {
     
      @include for-phone-only {
        padding-left: 0rem;
      }

      @include for-tablet-portrait-up {
        padding-left: 0rem;
      }

      @include for-desktop-up {
        padding-left: 10rem;
      }

      .img-wrap { 
        width: 100%;
        justify-content: start;

        img {
          transform: translateX(-10rem);

          @include for-phone-only {
            transform: translateX(0rem);
          }

          @include for-tablet-portrait-up {
            transform: translateX(0rem);
          }

          @include for-desktop-up {
            transform: translateX(-10rem);
          }

        }
      }
    }

    .col-text {
      
      @include for-phone-only {
        align-items: center;
      }

      @include for-tablet-portrait-up {
        align-items: center;
      }

      @include for-desktop-up {
        align-items: flex-end;
      }
    }
  }
}

</style>
