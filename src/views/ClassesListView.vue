<script setup lang="ts">
import ModuleBar from '@/components/Navigation/ModuleBar.vue';
import ButtonModule from '@/components/UI/ButtonModule.vue';
import DeleteModuleButton from '@/components/UI/DeleteModuleButton.vue';
import EditModuleButton from '@/components/UI/EditModuleButton.vue';
import ModuleText from '@/components/UI/ModuleText.vue';
import TableClass from '@/components/UI/TableClass.vue';
import type { IClass } from '@/interfaces/IClass';
import type { ICourse } from '@/interfaces/ICourse';
import router from '@/router';
import { getCourseDetails } from '@/services/getCourseDetails';
import { onMounted, ref, type Ref } from 'vue';

const courseId = router.currentRoute.value.params.courseId as string

const course: Ref<ICourse | null> = ref(null)
const courseClasses: Ref<IClass[]> = ref([])

onMounted(async () => {
    course.value = await getCourseDetails(courseId)
})
</script>

<template>
    <div v-if="course" class="flex justify-between">
        <section>
            <ModuleBar :course="course">
            </ModuleBar>
        </section>

        <section class="pl-120 pr-60 py-32 min-w-full">

            <ModuleText class="pb-8" title="Aulas" text="20 aulas registradas" subtitle="Aulas cadastradas no curso">
            </ModuleText>

            <TableClass class="py-5">

                <tr v-for="classToMap in courseClasses " :key="classToMap.id">
                    <td class="border border-solid border-gray-500 text-lg font-medium text-gray-300 py-2">{{
                        classToMap.name }}
                    </td>
                    <td class="border border-solid border-gray-500 text-lg font-medium text-gray-300 py-2">{{
                        classToMap.moduleId
                    }}</td>
                    <aside class="flex items-center justify-center w-36 gap-2 py-2">
                        <DeleteModuleButton></DeleteModuleButton>
                        <EditModuleButton></EditModuleButton>
                    </aside>
                </tr>

            </TableClass>
        </section>

        <section>
            <router-link :to="`/modules/:moduleId/classes/new`">
                <ButtonModule text="Adicionar aula" />
            </router-link>
        </section>
    </div>
</template>