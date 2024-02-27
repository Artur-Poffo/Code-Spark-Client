import type { IClass } from '@/interfaces/IClass'
import type { ICourse } from '@/interfaces/ICourse'
import type { IModule } from '@/interfaces/IModule'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/auth'
import AddClassToModuleView from '@/views/AddClassToModuleView.vue'
import AddModuleToCourseView from '@/views/AddModuleToCourseView.vue'
import CoursePageView from '@/views/CoursePageView.vue'
import EditClassView from '@/views/EditClassView.vue'
import EditModuleView from '@/views/EditModuleView.vue'
import EditUserView from '@/views/EditUserView.vue'
import EnrollCourseView from '@/views/EnrollCourseView.vue'
import ModulePageView from '@/views/ModulePageView.vue'
import ProfileViewVue from '@/views/ProfileView.vue'
import RegisterCourseView from '@/views/RegisterCourseView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import HomeView from '../views/HomeView.vue'
import CatalogPageViewVue from '@/views/CatalogPageView.vue'
import ClassViewVue from '@/views/ClassView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return {
      top: 0
    }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/courses/new',
      name: 'registerCourse',
      component: RegisterCourseView,
    },

    {
      path: '/courses/:courseId/modules/new',
      name: 'addModuleToCourse',
      component: AddModuleToCourseView,
      beforeEnter: async (to, from, next) => {
        const courseId = to.params.courseId as string
        const { user } = useAuthStore()

        try {
          const {data: { course }} = await api.get<{course: ICourse}>(`/courses/${courseId}`)
          const instructorIsTheOwner = user && user.id === course.instructorId

          if (!instructorIsTheOwner) {
            return next({
              path: '/' // Unauthorized
            })
          }

          return next() // OK, continue
        } catch (err) {
          console.error(err)

          // Future 404 page
          return next({
            path: '/'
          })
        }
      }
    },

    {
      path: '/modules/:moduleId/edit',
      name: 'editModuleDetails',
      component: EditModuleView,
      beforeEnter: async (to, from, next) => {
        const moduleId = to.params.moduleId as string
        const { user } = useAuthStore()

        try {
          const {data: { module }} = await api.get<{module: IModule}>(`/modules/${moduleId}`)
          const {data: { course }} = await api.get<{course: ICourse}>(`/courses/${module.courseId}`)
          
          const instructorIsTheOwner = user && user.id === course.instructorId

          if (!instructorIsTheOwner) {
            return next({
              path: '/', // Unauthorized
            })
          }

          return next() // OK, continue
        } catch (err) {
          console.error(err)

          // Future 404 page
          return next({
            path: '/'
          })
        }
      }
    },

    {
      path: '/modules/:moduleId/classes/new',
      name: 'addClassToModule',
      component: AddClassToModuleView,
      beforeEnter: async (to, from, next) => {
        const moduleId = to.params.moduleId as string
        const { user } = useAuthStore()

        try {
          const {data: { module }} = await api.get<{module: IModule}>(`/modules/${moduleId}`)
          const {data: { course }} = await api.get<{course: ICourse}>(`/courses/${module.courseId}`)

          const instructorIsTheOwner = user && user.id === course.instructorId

          if (!instructorIsTheOwner) {
            return next({
              path: '/' // Unauthorized
            })
          }

          return next() // OK, continue
        } catch (err) {
          console.error(err)

          // Future 404 page
          return next({
            path: '/'
          })
        }
      }
    },

    {
      path: '/classes/:classId/edit',
      name: 'editClassDetails',
      component: EditClassView,
      beforeEnter: async (to, from, next) => {
        const classId = to.params.classId as string
        const { user } = useAuthStore()

        try {
          const {data: { class: classFound }} = await api.get<{class: IClass}>(`/classes/${classId}`)
          const {data: { module }} = await api.get<{module: IModule}>(`/modules/${classFound.moduleId}`)
          const {data: { course }} = await api.get<{course: ICourse}>(`/courses/${module.courseId}`)

          const instructorIsTheOwner = user && user.id === course.instructorId

          if (!instructorIsTheOwner) {
            return next({
              path: '/' // Unauthorized
            })
          }

          return next() // OK, continue
        } catch (err) {
          console.error(err)

          // Future 404 page
          return next({
            path: '/'
          })
        }
      }
    },

    {
      path: '/courses/:courseId/enroll',
      name: 'enroll',
      component: EnrollCourseView,
      beforeEnter: (async (to, from, next) => {
        const { user } = useAuthStore()
        const courseId = to.params.courseId as string

        try {
          const {data: { course }} = await api.get<{course: ICourse}>(`/courses/${courseId}`)
          const userIsTheOwner = user && user.id === course.instructorId
          
          if (userIsTheOwner) {
            return next({
              path: `/courses/${courseId}/dashboard`
            })
          }

          return next()
        } catch (err) {
          console.error(err)
          return next({
            path: '/'
          })
        }
      })
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        hideNavbar: true,
       },
       beforeEnter: (_to, _from, next) => {
        const { isAuthenticated } = useAuthStore()

        if (isAuthenticated) {
          return next({
            path: '/'
          })
        }

        return next()
       }
    },

    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: {
        hideNavbar: true,
       },
      beforeEnter: (_from, _to, next) => {
        const { isAuthenticated } = useAuthStore()

        if (isAuthenticated) {
          return next({
            path: '/'
          })
        }
        return next()
       }
      },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileViewVue
    },

    {
      path: '/profile/edit',
      name: 'editAuthenticatedUser',
      component: EditUserView,
      beforeEnter: (_to, _from, next) => {
        const { isAuthenticated } = useAuthStore()

        if (!isAuthenticated) {
          return next({
            path: '/' // Not authenticated
          })
        }

        return next()
       }
    },

    {
      path: '/classpage',
      name: 'classpage',

      component: ClassPageViewVue
    },
      
    {
      path: '/modules',
      name: 'modules',
      component: ModulePageView
    },
      
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPageViewVue
    },
      
    {
      path: '/coursepage',
      name: 'coursepage',
      component: CoursePageView
    },
    {
      path: '/classes',
      name: 'classes',
      component: ClassViewVue
      
    }
  ]
})

router.beforeEach(async () => {
  const { getAuthenticatedUserData } = useAuthStore()
  const { cookies } = useCookies()
  
  const cookie = cookies.get('spark.accesstoken')

  if (cookie) {
    await getAuthenticatedUserData()
  }
})

export default router
