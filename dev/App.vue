<script setup lang="ts">
import { ref } from 'vue'
import { AdminContent } from '~/components/RootRenderer' // Импорт из исходников

const testContent = ref(`
  <h1>Тест библиотеки</h1>
  <p>Проверка вставки: %ссылка_приложения(Kaspi.kz)%</p>
  <p>Еще одна: %товар(iPhone 16)%</p>
`)
</script>

<template>
  <div style="padding: 20px">
    <AdminContent :content="testContent" />
    <textarea v-model="testContent" style="width: 100%; height: 100px; margin-top: 20px" />
  </div>
</template>
