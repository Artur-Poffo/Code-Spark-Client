<script lang="ts">
import ContentListWrapper from '@/components/UI/ContentListWrapper.vue';
import CourseCard from '@/components/UI/CourseCard.vue';
import DefaultList from '@/components/UI/DefaultList.vue';
import DefaultTitle from '@/components/UI/DefaultTitle.vue';
import EmptyList from '@/components/UI/EmptyList.vue';
import type { ICourseWithInstructorAndEvaluationsAverage } from '@/interfaces/ICourseWithInstructorAndEvaluationsAverage';
import { fetchInstructorCourses } from '@/services/fetchInstructorCourses';
import { fetchRecentCourses } from '@/services/fetchRecentCourses';
import { fetchStudentCourses } from '@/services/fetchStudentCourses';
import { useAuthStore } from '@/stores/auth';

export default {
  components: {
    DefaultTitle,
    ContentListWrapper,
    DefaultList,
    CourseCard,
    EmptyList
  },

  data() {
    const { user } = useAuthStore()

    const isAStudent = user?.role === 'STUDENT'

    return {
      recentCourses: [] as ICourseWithInstructorAndEvaluationsAverage[],
      studentCourses: [] as ICourseWithInstructorAndEvaluationsAverage[],
      instructorCourses: [] as ICourseWithInstructorAndEvaluationsAverage[],
      user,
      isAStudent
    }
  },

  mounted() {
    this.fetchRecentCourses()

    if (this.user && this.isAStudent) {
      this.fetchStudentCourses(this.user.id)
    } else if (this.user && !this.isAStudent) {
      this.fetchInstructorCourses(this.user.id)
    }
  },

  methods: {
    async fetchRecentCourses() {
      this.recentCourses = await fetchRecentCourses()
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
  <section id="home" class="px-4 pb-10">
    <article class="max-w-screen-2xl mx-auto max-sm:pt-12 pt-28 flex flex-col gap-8">
      <header>
        <DefaultTitle :text="`${user?.name ? `Bem vindo, ${user.name}` : 'Bem vindo!'}`" />
      </header>

      <main class="flex flex-col gap-9">
        <ContentListWrapper v-if="user && (studentCourses.length > 0 || instructorCourses.length > 0)"
          :title="`${isAStudent ? 'Continue de onde parou' : 'Seus cursos'}`">
          <DefaultList v-if="isAStudent && studentCourses.length > 0" class="justify-center xl:justify-start">
            <li class="w-full xs:w-auto" v-for="course in studentCourses" :key="course.course.id">
              <CourseCard :course="course" />
            </li>
          </DefaultList>

          <DefaultList v-else-if="instructorCourses.length > 0" class="justify-center xl:justify-start">
            <li class="w-full xs:w-auto" v-for="course in instructorCourses" :key="course.course.id">
              <CourseCard :course="course" />
            </li>
          </DefaultList>
        </ContentListWrapper>

        <ContentListWrapper title="Cursos recentes">
          <DefaultList v-if="recentCourses.length > 0" class="justify-center xl:justify-start">
            <li class="w-full xs:w-auto" v-for="course in recentCourses" :key="course.course.id">
              <CourseCard :course="course" />
            </li>
          </DefaultList>

          <EmptyList v-else />
        </ContentListWrapper>
      </main>
    </article>
  </section>
</template>