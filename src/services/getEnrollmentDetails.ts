import type { IEnrollment } from "@/interfaces/IEnrollment"
import { api } from "@/lib/axios"

export async function getEnrollmentDetails(courseId: string, studentId: string) {
  const response = await api.get<{ enrollment: IEnrollment }>(`/courses/${courseId}/students/${studentId}/enrollments`)
  return response.data.enrollment
}