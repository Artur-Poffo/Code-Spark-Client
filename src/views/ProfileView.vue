<script lang="ts">
import CourseCard from '@/components/UI/CourseCard.vue';
import DefaultList from '@/components/UI/DefaultList.vue';
import DefaultTitle from '@/components/UI/DefaultTitle.vue';
import EmptyList from '@/components/UI/EmptyList.vue';
import UserTag from '@/components/UI/UserTag.vue';
import type { ICourseWithInstructorAndEvaluationsAverage } from '@/interfaces/ICourseWithInstructorAndEvaluationsAverage';
import { fetchInstructorCourses } from '@/services/fetchInstructorCourses';
import { fetchStudentCourses } from '@/services/fetchStudentCourses';
import { getUserData } from '@/services/getUserData';
import { useAuthStore } from '@/stores/auth';

export default {
    components: {
        CourseCard,
        DefaultList,
        DefaultTitle,
        UserTag,
        EmptyList
    },

    data() {
        const { user } = useAuthStore()

        return {
            user,
            cloudflarePublicUrl: import.meta.env.VITE_CLOUDFLARE_PUBLIC_URL,
            studentCourses: [] as ICourseWithInstructorAndEvaluationsAverage[],
            instructorCourses: [] as ICourseWithInstructorAndEvaluationsAverage[],
        }
    },

    methods: {
        async getUserData(userId: string) {
            this.user = await getUserData(userId)
        },

        async fetchStudentCourses(studentId: string) {
            this.studentCourses = await fetchStudentCourses(studentId)
        },

        async fetchInstructorCourses(instructorId: string) {
            this.instructorCourses = await fetchInstructorCourses(instructorId)
        },
    }
}
</script>

<template>
    <section class="pt-32 px-4 pb-10">
        <article class="max-w-screen-xl mx-auto flex flex-col gap-10">
            <header class="flex flex-col gap-4 justify-between">
                <div class="flex flex-col lg:flex-row gap-4">
                    <div class="w-full h-full p-5 flex flex-col items-center flex-1 md:flex-row gap-7 bg-gray-800 rounded">
                        <div class="-mt-14 md:-mt-0 flex flex-col items-center">
                            <img v-if="user?.profileImageKey" :src="`${cloudflarePublicUrl}/${user.profileImageKey}`"
                                alt="Imagem do usuário" class="w-48 h-48 rounded object-cover">

                            <div v-else class="w-48 h-48 rounded default-gradient" />

                            <UserTag class="-mt-2 md:mx-2"
                                :text="user?.role === 'INSTRUCTOR' ? 'INSTRUTOR' : 'ESTUDANTE'" />
                        </div>

                        <div class="w-full px-4">
                            <h1 class="font-bold text-2xl">Artur Poffo</h1>
                            <h2 class="text-xl">Email</h2>
                            <p class="text-lg">ArturPoffo@gmail.com</p>

                            <h2 class="text-xl">Idade</h2>
                            <p class="text-lg">16</p>
                        </div>
                    </div>

                    <div class="lg:max-w-md h-full flex flex-col gap-3">
                        <div class="h-full p-5 flex justify-center bg-gray-800 rounded-lg">
                            <div class="flex flex-col gap-3">
                                <h1 class="text-2xl font-bold ">Biografia</h1>
                                <p class="text-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
                                    asperiores
                                    exercitationem qui est,
                                    eos tempore accusamus optio quas culpa similique quibusdam accusantium! Perspiciatis
                                    earum
                                    quae
                                    reiciendis eveniet, velit eaque voluptatum? Autem quisquam fuga, id aperiam veniam
                                    ducimus
                                    aut
                                    temporibus, facilis, amet alias nesciunt fugiat accusamus beatae libero ullam
                                    consectetur
                                    corporis.
                                </p>
                            </div>
                        </div>

                        <div class="w-full bg-gray-800 h-min rounded">
                            <h1 class="font-bold text-2xl px-5"><span class="text-green-500">{{ 0 }}</span>
                                Cursos
                                Registrados</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main class="flex flex-col gap-8">
                <header>
                    <DefaultTitle class="text-green-500" text="Inscrito em"></DefaultTitle>
                </header>

                <DefaultList v-if="user && user.role === 'STUDENT'" :centered="true">
                    <li class="w-full xs:w-auto" v-for="course in studentCourses" :key="course.course.id">
                        <CourseCard :course="course" />
                    </li>
                </DefaultList>

                <EmptyList v-else-if="studentCourses.length === 0" />

                <DefaultList v-if="user && user.role === 'INSTRUCTOR'" :centered="true">
                    <li class="w-full xs:w-auto" v-for="course in instructorCourses" :key="course.course.id">
                        <CourseCard :course="course" />
                    </li>
                </DefaultList>

                <EmptyList v-else-if="instructorCourses.length === 0" />
            </main>
        </article>
    </section>
</template>
