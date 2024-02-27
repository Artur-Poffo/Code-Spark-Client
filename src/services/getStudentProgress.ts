import type { ICourseWithStudentProgress } from "@/interfaces/ICourseWithStudentProgress"
import { api } from "@/lib/axios"

export async function getStudentProgress(enrollmentId: string) {
  const response = await api.get<ICourseWithStudentProgress>(`/enrollments/${enrollmentId}/progress`)
  return response.data
}