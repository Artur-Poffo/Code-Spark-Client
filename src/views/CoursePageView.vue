<script lang="ts">
import ModuleWrapper from '@/components/UI/ModuleWrapper.vue';
import TagsCarousel from '@/components/UI/TagsCarousel.vue';
import type { ICourse } from '@/interfaces/ICourse';
import type { ICourseWithStudentProgress } from '@/interfaces/ICourseWithStudentProgress';
import type { IEnrollment } from '@/interfaces/IEnrollment';
import type { ITag } from '@/interfaces/ITag';
import { fetchCourseTags } from '@/services/fetchCourseTags';
import { getCourseDetails } from '@/services/getCourseDetails';
import { getEnrollmentDetails } from '@/services/getEnrollmentDetails';
import { getStudentProgress } from '@/services/getStudentProgress';
import { useAuthStore } from '@/stores/auth';
import ProgressBar from 'primevue/progressbar';

export default {
    components: {
        ModuleWrapper,
        TagsCarousel,
        ProgressBar
    },

    data() {
        return {
            course: null as ICourse | null,
            tags: [] as ITag[],
            enrollment: null as IEnrollment | null,
            studentProgress: null as ICourseWithStudentProgress | null
        }
    },

    async mounted() {
        const courseId = this.$router.currentRoute.value.params.courseId as string
        const { user } = useAuthStore()

        if (!courseId || !user) {
            this.$router.push('/')
            return
        }

        await this.getEnrollmentDetails(courseId, user.id)

        await this.getCourseDetails(courseId)
        await this.fetchCourseTags(courseId)

        if (!this.enrollment) {
            this.$router.push('/')
            return
        }

        await this.getStudentProgress(this.enrollment.id)
    },

    methods: {
        async getCourseDetails(courseId: string) {
            const response = await getCourseDetails(courseId)
            this.course = response
        },

        async getEnrollmentDetails(courseId: string, studentId: string) {
            const response = await getEnrollmentDetails(courseId, studentId)
            this.enrollment = response
        },

        async fetchCourseTags(courseId: string) {
            const response = await fetchCourseTags(courseId)
            this.tags = response
        },

        async getStudentProgress(enrollmentId: string) {
            const response = await getStudentProgress(enrollmentId)
            this.studentProgress = response
        }
    },

    computed: {
        completedClasses() {
            return this.studentProgress?.classes.filter(classToFilter => classToFilter.completed)
        },

        completionPercentage() {
            if (!this.completedClasses || !this.studentProgress) {
                return
            }

            let totalClasses = this.studentProgress.classes.length;
            let completedClasses = this.completedClasses.length;

            return (completedClasses / totalClasses) * 100;
        }
    }
}
</script>

<template>
    <section v-if="course" class="flex gap-12 flex-col sm:pt-28 pb-10 md:px-16">
        <header class="w-full flex flex-col gap-12">
            <img v-if="course.bannerImageKey" class="w-full h-96 rounded object-cover" :src="course.bannerImageKey"
                alt="Imagem do curso">
            <div v-else class="w-full h-96 rounded default-gradient" />

            <div class="flex flex-col gap-2 px-4">
                <h1 class="text-2xl font-semibold">{{ course.name }}</h1>

                <TagsCarousel :tags="tags" />
            </div>
        </header>

        <main class="flex flex-col gap-10 relative">
            <div class="flex flex-col-reverse md:flex-row gap-12 px-4">
                <ul v-if="studentProgress" class="w-full flex flex-col gap-4">
                    <li v-for="module in studentProgress.modules" :key="module.id"
                        class="flex flex-col bg-gray-800 w-full max-w-4xl p-5 gap-2 relative rounded">
                        <ModuleWrapper :module="module"></ModuleWrapper>
                        <i
                            :class="`pi pi-check-circle text-2xl ${module.completed && 'text-green-200'} absolute -translate-x-1/2 -translate-y-1/2 top-1/2 -right-7`"></i>
                    </li>
                </ul>

                <div v-if="studentProgress && completedClasses"
                    class="bg-gray-800 w-full md:w-120 p-5 block md:sticky top-32 h-min rounded right-20">
                    <div class="flex flex-col gap-3">
                        <h1 class="font-medium text-xl">Progresso do curso</h1>
                        <div class="flex justify-center items-center gap-5">
                            <h2 class="flex-1">Aulas {{ completedClasses.length }}/{{ studentProgress.classes.length }}</h2>
                            <ProgressBar :value="completionPercentage" :showValue="false" class="w-3/4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </section>
</template>