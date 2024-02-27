<script setup lang="ts">
import type { ICourseWithInstructorAndEvaluationsAverage } from '@/interfaces/ICourseWithInstructorAndEvaluationsAverage';
import DefaultLink from '../Navigation/DefaultLink.vue';
import Evaluation from '../UI/Evaluation.vue';

const cloudflarePublicUrl = import.meta.env.VITE_CLOUDFLARE_PUBLIC_URL;

defineProps<{
  course: ICourseWithInstructorAndEvaluationsAverage
}>()
</script>

<template>
  <router-link :to="`/courses/${course.course.id}/enroll`">
    <article
      class="bg-gray-800 rounded w-full xs:w-80 cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all">
      <header>
        <img v-if="course.course.coverImageKey" class="w-full h-44 object-cover rounded"
          :src="`${cloudflarePublicUrl}/${course.course.coverImageKey}`" alt="Imagem do curso">
        <div v-else class="w-full h-44 rounded bg-gradient-to-br from-green-500 to-green-200" />
      </header>

      <main class="p-4 flex flex-col gap-5">
        <div>
          <h2 class="text-lg font-bold text-white">{{ course.course.name }}</h2>
          <DefaultLink :small="true" :text="course.instructor.name" :to="`/profile/${course.instructor.id}`" />
        </div>

        <Evaluation v-if="course.evaluationsAverage" :active="course.evaluationsAverage" :read-only="true" />
        <span v-else class="text-sm text-gray-400">Sem avaliações</span>
      </main>
    </article>
  </router-link>
</template>