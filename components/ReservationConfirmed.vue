<template>

    <div class="reservation-confirmed">
      <div class="reservation-confirmed__container">
        <NuxtImg class="icon1 loop" src="/img/booking-icon.svg" />
        <h3>Reservation has been confirmed</h3>
        <p>We look forward to seeing you in our restaurant</p>
        <!-- <NuxtImg class="icon2" src="/img/oyster2.png" alt="" /> -->
      </div>
    </div>
</template>

<script setup> 

</script>


<style lang="scss">

.reservation-confirmed {
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    color: #262626;
    text-transform: uppercase;
    transition: all 0.75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #ffffffea;
    // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

    .icon1 {
        width: 100px;
        margin-bottom: 3rem;
    }
    
    .icon2 {
        position: absolute;
        bottom: 2rem;
        width: 100px;
        margin-bottom: 2rem;
        fill: transparent;
        z-index: 1;

        path {
          stroke: #f7f7f7;
        }
    }

    h3 {
      font-weight: 400;
      font-size: 3.5rem;
      line-height: 3.75rem;
      margin: 1rem;
      text-transform: none;
    }

    p {
        margin-top: 0.5rem;
        text-transform: none;
        font-size: 1.15rem;
        font-weight: 400;
        font-style: normal;
    }

    small {
        font-size: 1.25rem;
        text-transform: none;
    }

    &.error {
      h3, p {
        color: red;
      }
      
    }
}
</style>