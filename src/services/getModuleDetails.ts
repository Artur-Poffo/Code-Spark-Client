import type { IModule } from "@/interfaces/IModule"
import { api } from "@/lib/axios"

export async function getModuleDetails(moduleId: string) {
  const response = await api.get<{ module: IModule }>(`/modules/${moduleId}`)
  return response.data.module
}