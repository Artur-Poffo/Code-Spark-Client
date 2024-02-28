<script setup lang="ts">
import type { IClassWithStudentProgress } from '@/interfaces/IClassWithStudentProgress';

const { classToRender } = defineProps<{
  classToRender: IClassWithStudentProgress
}>()

const emit = defineEmits<{
  markAsCompleted: [classId: string]
}>()

function handleMarkAsCompleted() {
  emit('markAsCompleted', classToRender.id)
}
</script>

<template>
  <router-link :to="`/modules/${classToRender.moduleId}/classes/${classToRender.id}`">
    <article class="w-full p-5 rounded bg-gray-500 flex items-center gap-2 cursor-pointer">
      <button @click="handleMarkAsCompleted">
        <i :class="`pi pi-check ${classToRender.completed ? 'text-green-500' : 'text-gray-300'}`"></i>
      </button>

      <span :class="`${classToRender.completed ? 'text-green-500' : 'text-gray-200'} font-bold`">{{ classToRender.name
      }}</span>
    </article>
  </router-link>
</template>