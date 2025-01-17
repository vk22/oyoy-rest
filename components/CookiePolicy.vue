<template>
    <Transition>
    <div class="consent-banner" v-if="!user && dataReady">
        <div class="text">
            <div class="title">We value your privacy</div>
            <p>
            We use tracking cookies to understand how you use the product 
            and help us improve it.
            Please accept cookies to help us improve.
            </p>
        </div>
        <div class="buttons">
            <button class="btn inverse mr-3" @click="declineCookies">Decline cookies</button>
            <button class="btn" @click="acceptCookies">Accept cookies</button>
        </div>
    </div>
    </Transition>
</template>

<script setup>
import { useMainStore }  from '@/store/index';
const mainStore = useMainStore();
const dataReady = computed(() => mainStore.getDataReady);

///
const user = useCookie('user_cookies');

function acceptCookies() {
    user.value = { accept_cookies: true }
}
function declineCookies() {
    user.value = { accept_cookies: false }
}

</script>

<style lang="scss">
    .consent-banner {
        background: #fff;
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100vw;
        z-index: 9999;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        box-shadow: 0 -1px 10px 0 #acabab4d;
        

        .text {
            .title {
                font-size: 1rem;
                font-weight: 700;
                margin-bottom: .5rem;
            }
        }

        &.active {
            animation: fadeUp 1s ease-in-out;
        }
    }


    @keyframes fadeUp {
        from {
            bottom: -200px;
            opacity: 0;
        }
        to {
            bottom: 0;
            opacity: 1;
        }
    }
</style>
