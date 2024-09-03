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

<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
