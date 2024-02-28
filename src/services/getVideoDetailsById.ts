import type { IVideo } from "@/interfaces/IVideo"
import { api } from "@/lib/axios"

export async function getVideoDetailsById(videoId: string) {
  const response = await api.get<{video: IVideo}>(`/videos/find/id/${videoId}`)
  return response.data.video
}