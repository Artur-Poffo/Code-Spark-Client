import type { IClass } from "@/interfaces/IClass"
import { api } from "@/lib/axios"

export async function fetchModuleClasses(moduleId: string) {
  const response = await api.get<{ classes: IClass[] }>(`/modules/${moduleId}/classes`) 
  return response.data.classes
}