<script setup lang="ts">
import DefaultButton from '@/components/UI/DefaultButton.vue';
import DefaultInput from '@/components/UI/DefaultInput.vue';
import DefaultTextArea from '@/components/UI/DefaultTextArea.vue';
import FormPageTemplate from '@/components/UI/FormPageTemplate.vue';
import type { IModule } from '@/interfaces/IModule';
import { api } from '@/lib/axios';
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const moduleId = router.currentRoute.value.params.moduleId as string

const isSubmitting = ref(false)

const originalModule: Ref<IModule | null> = ref(null)
const formData = ref({
  name: '',
  description: '',
  moduleNumber: null as number | null
})

onMounted(async () => {
  try {
    const { data: { module } } = await api.get<{ module: IModule }>(`/modules/${moduleId}`)

    originalModule.value = module

    formData.value = {
      name: module.name ?? '',
      description: module.description ?? '',
      moduleNumber: module.moduleNumber ?? null,
    }
  } catch (err) {
    console.error(err)
    router.push('/') // Not found
  }
})

async function handleEditModuleDetails() {
  isSubmitting.value = true

  try {
    await api.put(`/modules/${moduleId}`, {
      name: originalModule.value?.name !== formData.value.name ? formData.value.name : undefined,
      description: originalModule.value?.description !== formData.value.description ? formData.value.description : undefined,
      moduleNumber: originalModule.value?.moduleNumber !== formData.value.moduleNumber ? Number(formData.value.moduleNumber) : undefined
    })

    router.push(`/courses/${originalModule.value?.courseId}`)
  } catch (err) {
    console.error(err)
    isSubmitting.value = false
  }
}
</script>

<template>
  <FormPageTemplate title="Editar módulo">
    <form @submit.prevent="handleEditModuleDetails" class="w-full max-w-xl flex flex-col gap-5">
      <DefaultInput v-model="formData.name" type="text" label="Nome do módulo" placeholder="Nome do módulo" />
      <DefaultTextArea v-model="formData.description" type="text" label="Descrição do módulo"
        placeholder="Uma breve descrição sobre o módulo" />
      <DefaultInput v-model="formData.moduleNumber" type="number" label="Número do módulo"
        placeholder="Número do módulo, responsável pela ordem de exibição" />

      <strong class="text-center my-4">
        Você poderá adicionar aulas a este módulo na página de
        aulas do seu curso, após o
        registro
      </strong>

      <DefaultButton text="Salvar" :disabled="isSubmitting" />
    </form>
  </FormPageTemplate>
</template>