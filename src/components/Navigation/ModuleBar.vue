<script setup lang="ts">
import type { ICourse } from '@/interfaces/ICourse';
import { useAuthStore } from '@/stores/auth';

const cloudflarePublicUrl = import.meta.env.VITE_CLOUDFLARE_PUBLIC_URL

const { user } = useAuthStore()

defineProps<{
    course: ICourse
}>()
</script>

<template>
    <aside v-if="user" class="h-3/4 w-80 flex flex-col gap-8 rounded-xl fixed top-32 left-8 bottom-24 bg-gray-800 px-10">
        <header class="text-center flex flex-col items-center gap-6">
            <div class="py-5">
                <h1 class="font-righteous text-2xl text-white">{{ user.name }}</h1>
                <span class="text-md text-gray-200">{{ user.email }}</span>
            </div>

            <img v-if="user.profileImageKey" class="w-40 h-40 object-cover rounded"
                :src="`${cloudflarePublicUrl}/${user.profileImageKey}`" alt="Imagem do Usuário">

            <div v-else class="w-40 h-40 rounded default-gradient" />
        </header>

        <nav class="py-2">
            <ul class="text-lg">
                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" :to="`/courses/${course.id}/dashboard`">Dashboard</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" :to="`/courses/${course.id}/students`">Estudantes
                        Inscritos</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" :to="`/courses/${course.id}/modules`">Módulos</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" :to="`/courses/${course.id}/classes`">Aulas</router-link>
                </li>

                <li class="py-10 hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link"
                        :to="`/courses/${course.id}/settings`">Configurações</router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>