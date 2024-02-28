import type { IClass } from "@/interfaces/IClass"
import { api } from "@/lib/axios"

export async function getClassDetails(classId: string) {
  const response = await api.get<{class: IClass}>(`/classes/${classId}`)
  return response.data.class
}