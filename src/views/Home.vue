<template>
  <el-button v-run type="danger">{{  count  }}</el-button>
  <el-button type="danger">{{  doubled  }}</el-button>
  <el-icon color="#409EFC" class="no-inherit">
    <Share />
  </el-icon>
  123
</template>

<script setup lang='ts'>
const count = ref(1)
const doubled = computed(() => count.value * 2)
</script>

<style>

</style>
