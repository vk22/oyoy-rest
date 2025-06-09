<template>
  <div>
    <AdminDialogWindow />
    <AdminLoading />
    <AdminHeader />
    <AdminSidebar />
    <div class="admin-container">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
useHead({
  meta: [
    { name: 'description', content: '' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
})
</script>

<style lang="scss">
@use "~/assets/scss/admin.scss";
</style>
