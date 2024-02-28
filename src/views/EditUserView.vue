<script setup lang="ts">
import DefaultButton from '@/components/UI/DefaultButton.vue';
import DefaultInput from '@/components/UI/DefaultInput.vue';
import DefaultTextArea from '@/components/UI/DefaultTextArea.vue';
import FormPageTemplate from '@/components/UI/FormPageTemplate.vue';
import UploadFileInput from '@/components/UI/UploadFileInput.vue';
import type { IUser } from '@/interfaces/IUser';
import { api } from '@/lib/axios';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const isSubmitting = ref(false)

const profileImage: Ref<File | null> = ref(null)
const originalUser: Ref<IUser | null> = ref(null)
const formData = ref({
  email: '',
  age: null as number | null,
  summary: '',
  profileImageKey: '',
})

onMounted(async () => {
  try {
    const { data } = await api.get<{ user: IUser }>(`/users`)

    originalUser.value = data.user

    formData.value = {
      email: data.user.email ?? '',
      age: data.user.age ?? null,
      summary: data.user.summary ?? '',
      profileImageKey: data.user.profileImageKey
    }
  } catch (err) {
    console.error(err)
    router.push('/') // Not found
  }
})

function handleSelectedFile(selectedEvent: FileUploadSelectEvent) {
  const { files } = selectedEvent

  if (files.length > 0) {
    profileImage.value = files[0] as File
  }
}

function handleClearFile() {
  profileImage.value = null
  formData.value.profileImageKey = originalUser.value?.profileImageKey ?? ''
}

async function handleEditUserDetails() {
  isSubmitting.value = true

  try {
    if (profileImage.value) {
      const { data: { file } } = await api.post<{ file: { imageKey: string } }>('/files', {
        file: profileImage.value
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      formData.value.profileImageKey = file.imageKey
    }

    await api.put(`/users`, {
      email: originalUser.value?.email !== formData.value.email ? formData.value.email : undefined,
      age: originalUser.value?.age !== formData.value.age ? Number(formData.value.age) : undefined,
      summary: originalUser.value?.summary !== formData.value.summary ? formData.value.summary : undefined,
      profileImageKey: originalUser.value?.profileImageKey !== formData.value.profileImageKey ? formData.value.profileImageKey : undefined,
    })

    router.push(`/profile/${originalUser.value?.id}`)
  } catch (err) {
    console.error(err)
    isSubmitting.value = false
  }
}
</script>

<template>
  <FormPageTemplate title="Editar perfil">
    <form @submit.prevent="handleEditUserDetails" class="w-full max-w-xl flex flex-col gap-5">
      <DefaultInput v-model="formData.email" type="email" label="Email" placeholder="Email" />
      <DefaultInput v-model="formData.age" type="number" label="Idade" placeholder="Idade" />
      <DefaultTextArea v-model="formData.summary" type="text" label="Bio" placeholder="Uma breve descrição sobre você" />

      <UploadFileInput label="Nova imagem de perfil" @file-clear="handleClearFile" @file-selected="handleSelectedFile"
        :accept-type="'image/png,image/jpeg'" />

      <DefaultButton text="Salvar" :disabled="isSubmitting" />
    </form>
  </FormPageTemplate>
</template>