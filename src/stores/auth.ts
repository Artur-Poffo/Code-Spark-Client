import type { IUser } from '@/interfaces/IUser'
import { api } from '@/lib/axios'
import router from '@/router'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useCookies } from 'vue3-cookies'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<IUser | null> = ref(null)
  const isAuthenticated: ComputedRef<boolean> = computed(() => {
    return !!user.value
  })
  
  async function getAuthenticatedUserData() {
    try {  
      const response = await api.get<{user: IUser}>('/users')
      user.value = response.data.user
    } catch (err) {
      console.error(err)
    }
  }

  async function logout() {
    const { cookies } = useCookies()
    cookies.remove('spark.accesstoken')

    user.value = null
    
    router.go(0)
  }

  return { user, isAuthenticated, getAuthenticatedUserData, logout }
})
