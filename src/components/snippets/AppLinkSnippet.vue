<script lang="ts" setup>
import { defineProps } from 'vue-demi'

interface Props {
  label: string
}
defineProps<Props>()

const handleAction = () => {
  console.log('Logics for Kaspi app integration 2025')
}
</script>

<template>
  <span class="snippet-placeholder" @click="handleAction">
    {{ label }}
  </span>
</template>

<style scoped>
.snippet-placeholder {
  color: #008be1;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px dashed #008be1;
}
</style>
