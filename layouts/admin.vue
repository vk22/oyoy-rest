<template>
  <div>
    <AdminHeader />
    <AdminSidebar />
    <div class="admin-container">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss">
@import "assets/scss/admin.scss";
</style>
