<script setup lang="ts" >
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import DefaultButton from '../UI/DefaultButton.vue';

const { user, getAuthenticatedUserData, isAuthenticated, logout } = useAuthStore()

onMounted(async () => {
  await getAuthenticatedUserData()
})
</script>

<template>
  <header class="fixed w-full flex items-center justify-between bg-gray-800 px-12 py-5 shadow-lg z-[999] max-sm:hidden">
    <router-link to="/">
      <h1 class="text-2xl font-righteous text-white">CodeSpark</h1>
    </router-link>

    <nav class="flex items-center gap-10">
      <ul class="flex gap-3">
        <li class="hover:opacity-80 transition-opacity">
          <router-link active-class="active-link" to="/">Home</router-link>
        </li>

        <li class="hover:opacity-80 transition-opacity">
          <router-link active-class="active-link" to="/catalog">Catálogo</router-link>
        </li>

        <li class="hover:opacity-80 transition-opacity">
          <router-link active-class="active-link" to="/profile">Perfil</router-link>
        </li>
      </ul>

      <!-- FIXME: On refresh page, isAuthenticated is identified as `false`, but in global state it is true -->
      <ul class="flex items-center gap-3">
        <li>
          <router-link to="/signin" v-if="!isAuthenticated">
            <DefaultButton class="py-1 px-3" text="Entrar" />
          </router-link>

          <DefaultButton v-else class="bg-red-500 py-1 px-3" @click="logout" text="Sair" />
        </li>

        <li v-if="isAuthenticated && user?.role === 'INSTRUCTOR'">
          <router-link to="/courses/new">
            <DefaultButton class="py-1 px-3" text="Novo curso" />
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>