<script setup lang="ts">
import ModuleBar from '@/components/Navigation/ModuleBar.vue';
import ButtonModule from '@/components/UI/ButtonModule.vue';
import ModuleText from '@/components/UI/ModuleText.vue';
import ModulesWrapper from '@/components/UI/ModuleWrapper.vue';
import { type IModule } from '@/interfaces/IModule';

const modules: IModule[] = []

</script>

<template>
    <div class="flex justify-between">
        <section>
            <ModuleBar>
            </ModuleBar>
        </section>

        <section class="pl-120 pr-60 py-32 min-w-full">
            <ModuleText title="Módulos" text="5 módulos cadastrados" subtitle="Módulos cadastrados no curso">
                <ul class="py-7">
                    <li v-for="module in modules" :key="module.id">
                        <ModulesWrapper :editable="false" :module="module">
                        </ModulesWrapper>
                    </li>
                </ul>
            </ModuleText>
        </section>
        <section class="fixed">
            <ButtonModule text="Adicionar módulo">
            </ButtonModule>
        </section>
    </div>
</template>
