import type { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/axios"

export async function getUserData(userId: string) {
  const response = await api.get<{user: IUser}>(`/users/${userId}`)
  return response.data.user
}