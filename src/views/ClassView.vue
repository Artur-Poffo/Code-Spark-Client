<script lang="ts">
import ClassCard from '@/components/UI/ClassCard.vue';
import Evaluation from '@/components/UI/Evaluation.vue';
import type { IClass } from '@/interfaces/IClass';
import type { ICourse } from '@/interfaces/ICourse';
import type { ICourseWithStudentProgress } from '@/interfaces/ICourseWithStudentProgress';
import type { IEnrollment } from '@/interfaces/IEnrollment';
import type { IModule } from '@/interfaces/IModule';
import type { IVideo } from '@/interfaces/IVideo';
import { fetchModuleClasses } from '@/services/fetchModuleClasses';
import { getClassDetails } from '@/services/getClassDetails';
import { getCourseDetails } from '@/services/getCourseDetails';
import { getEnrollmentDetails } from '@/services/getEnrollmentDetails';
import { getModuleDetails } from '@/services/getModuleDetails';
import { getStudentProgress } from '@/services/getStudentProgress';
import { getVideoDetailsById } from '@/services/getVideoDetailsById';
import { toggleMarkClassAsCompleted } from '@/services/toggleMarkClassAsCompleted';
import { useAuthStore } from '@/stores/auth';

export default {
  components: {
    ClassCard,
    Evaluation
  },

  data() {
    const cloudflarePublicUrl = import.meta.env.VITE_CLOUDFLARE_PUBLIC_URL as string

    return {
      module: null as IModule | null,
      course: null as ICourse | null,
      enrollment: null as IEnrollment | null,
      studentProgress: null as ICourseWithStudentProgress | null,
      moduleClasses: [] as IClass[],
      selectedClass: null as IClass | null,
      video: null as IVideo | null,
      cloudflarePublicUrl
    }
  },

  async mounted() {
    const { user } = useAuthStore()

    if (!user) {
      this.$router.push('/signin')
      return
    }

    const moduleId = this.$router.currentRoute.value.params.moduleId as string
    this.module = await getModuleDetails(moduleId)

    if (!this.module) {
      this.$router.push('/')
      return
    }

    this.course = await getCourseDetails(this.module.courseId)

    if (!this.course) {
      this.$router.push('/')
      return
    }

    this.enrollment = await getEnrollmentDetails(this.module.courseId, user.id)

    if (!this.enrollment) {
      this.$router.push('/')
      return
    }

    this.studentProgress = await getStudentProgress(this.enrollment.id)

    if (!this.studentProgress) {
      this.$router.push('/')
      return
    }

    this.moduleClasses = await fetchModuleClasses(moduleId)

    const classId = this.$router.currentRoute.value.params.classId as string
    this.selectedClass = await getClassDetails(classId)

    this.video = await getVideoDetailsById(this.selectedClass.videoId)
  },

  methods: {
    async handleMarkClassAsCompleted(classId: string) {
      await toggleMarkClassAsCompleted(classId, this.enrollment!.id)
    }
  },

  computed: {
    completedClassIds() {
      return this.studentProgress ? this.studentProgress.classes.map(classToMap => classToMap.id) : []
    },

    formattedClasses() {
      return this.moduleClasses.map(moduleClass => {
        if (this.completedClassIds.includes(moduleClass.id)) {
          return {
            ...moduleClass,
            completed: true
          }
        }

        return {
          ...moduleClass,
          completed: false
        }
      })
    }
  }
}
</script>

<template>
  <section v-if="selectedClass && video" class="flex justify-center w-full pt-10 sm:pt-28 pb-10 px-4">
    <main class="flex flex-col lg:flex-row gap-5">
      <div class="flex flex-col gap-5">
        <video controls class="w-full rounded">
          <source :src="`${cloudflarePublicUrl}/${video.videoKey}`">
        </video>

        <div class="w-full bg-gray-800 flex flex-col lg:flex-row lg:justify-between gap-10 rounded p-5">
          <div class="flex flex-col gap-3">
            <a :href="`/courses/${course?.id}`" class="text-sm text-gray-300 underline underline-offset-4">{{ course?.name
            }}</a>
            <h1 class="font-semibold text-xl">{{ selectedClass.name }}</h1>
            <p class="max-w-xl font-medium">
              {{ selectedClass.description }}
            </p>
          </div>

          <div class="flex flex-col items-center gap-2">
            <h1 class="font-semibold text-lg">Avaliar a Aula</h1>
            <Evaluation :length="5" :disabled="false" :read-only="false" :active="3" />
          </div>
        </div>
      </div>

      <aside class="w-full lg:w-96 max-h-[956px] bg-gray-800 overflow-scroll rounded">
        <ul class="flex flex-col gap-3 p-4">
          <li v-for="classToMap in formattedClasses" :key="classToMap.id">
            <ClassCard @mark-as-completed="handleMarkClassAsCompleted" :classToRender="classToMap" />
          </li>
        </ul>
      </aside>
    </main>
  </section>
</template>
