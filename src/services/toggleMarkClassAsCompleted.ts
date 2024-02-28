import { api } from "@/lib/axios"

export async function toggleMarkClassAsCompleted(classId: string, enrollmentId: string) {
  await api.post(`/enrollments/${enrollmentId}/classes/${classId}/completed`, {})
}