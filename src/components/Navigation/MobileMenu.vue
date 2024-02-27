<script setup lang="ts">
import type { IUser } from '@/interfaces/IUser';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import DefaultButton from '../UI/DefaultButton.vue';
import DefaultTitle from '../UI/DefaultTitle.vue';

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

const isOpen = ref(false)
</script>

<template>
  <div @click="isOpen = !isOpen"
    class="sm:hidden w-9 h-9 flex flex-col gap-2 fixed top-14 right-8 cursor-pointer z-[999]">
    <div class="w-full h-1 rounded bg-green-500"></div>
    <div class="w-full h-1 rounded bg-green-500"></div>
    <div class="w-full h-1 rounded bg-green-500"></div>
  </div>

  <div @click="isOpen = false"
    :class="`sm:hidden w-screen h-screen fixed top-0 left-0 z-[998] ${isOpen ? '-ml-0' : '-ml-[100vw]'} transition-all`">
    <div class="w-1/2 h-full rounded-tr-2xl rounded-br-2xl bg-gray-900 flex flex-col items-center justify-center gap-9">
      <router-link to="/">
        <DefaultTitle text="CodeSpark" />
      </router-link>

      <nav class="flex flex-col items-center gap-12">
        <ul class="flex flex-col items-center gap-5">
          <li>
            <router-link active-class="active-link" to="/">Home</router-link>
          </li>
          <li>
            <router-link active-class="active-link" to="/catalog">Catálogo</router-link>
          </li>
          <li v-if="isAuthenticated && user">
            <router-link active-class="active-link" :to="`/profile/${user.id}`">Perfil</router-link>
          </li>
        </ul>

        <ul class="flex flex-col items-center gap-5">
          <li>
            <router-link to="/signin" v-if="!isAuthenticated">
              <DefaultButton class="py-1 px-3" text="Entrar" />
            </router-link>

            <DefaultButton v-else class="bg-red-500 py-1 px-3" @click="logout" text="Sair" />
          </li>

          <li v-if="isAuthenticated && user && user.role === 'INSTRUCTOR'">
            <router-link to="/courses/new">
              <DefaultButton class="py-1 px-3" text="Novo curso" />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>