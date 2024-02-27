import type { ITag } from "@/interfaces/ITag"
import { api } from "@/lib/axios"

export async function fetchCourseTags(courseId: string) {
  const response = await api.get<{tags: ITag[]}>(`/courses/${courseId}/tags`)
  return response.data.tags
}