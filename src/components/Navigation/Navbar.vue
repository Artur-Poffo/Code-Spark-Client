<script setup lang="ts" >
import type { IUser } from '@/interfaces/IUser';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import DefaultButton from '../UI/DefaultButton.vue';

const { logout } = useAuthStore()
const user: Ref<IUser | null> = ref(null)
const isAuthenticated = ref(false)
const isAStudent = computed(() => {
  return user.value && user.value.role === 'STUDENT'
})

onMounted(async () => {
  const { cookies } = useCookies()
  const acesasToken = cookies.get('spark.accesstoken')

  if (acesasToken) {
    isAuthenticated.value = true

    try {
      const userData = await api.get<{ user: IUser }>('/users')
      user.value = userData.data.user
    } catch (err) {
      console.error(err)
      user.value = null
    }
  }
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

        <li v-if="isAuthenticated && user" class="hover:opacity-80 transition-opacity">
          <router-link active-class="active-link" :to="`/profile/${user.id}`">Perfil</router-link>
        </li>
      </ul>

      <ul class="flex items-center gap-3">
        <li>
          <router-link to="/signin" v-if="!isAuthenticated">
            <DefaultButton class="py-1 px-3" text="Entrar" />
          </router-link>

          <DefaultButton v-else class="bg-red-500 py-1 px-3" @click="logout" text="Sair" />
        </li>

        <li v-if="isAuthenticated && !isAStudent">
          <router-link to="/courses/new">
            <DefaultButton class="py-1 px-3" text="Novo curso" />
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>