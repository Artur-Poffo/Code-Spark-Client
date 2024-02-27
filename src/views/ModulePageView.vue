<script setup lang="ts">
import ModuleBar from '@/components/Navigation/ModuleBar.vue';
import ModulesWrapper from '@/components/UI/ModuleWrapper.vue';
import ModuleText from '@/components/UI/ModuleText.vue';
import ButtonModule from '@/components/UI/ButtonModule.vue';
import { type IModule } from '@/interfaces/IModule';
import type DeleteModuleButtonVue from '@/components/UI/DeleteModuleButton.vue';
import EditModuleButton from '@/components/UI/EditModuleButton.vue';
const modules: IModule[] = [
    {
        id: 1,
        title: 'O que vamos aprender?',
        text: 'Lorem ipsum dolor sit amet, ipsum dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut venenatis.'
    },
    {
        id: 2,
        title: 'O que vamos aprender?',
        text: 'Lorem ipsum dolor sit amet, ipsum dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut venenatis.'
    },
    {
        id: 3,
        title: 'O que vamos aprender?',
        text: 'Lorem ipsum dolor sit amet, ipsum dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut venenatis.'
    },
    {
        id: 4,
        title: 'O que vamos aprender?',
        text: 'Lorem ipsum dolor sit amet, ipsum dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut venenatis.'
    },
    {
        id: 5,
        title: 'O que vamos aprender?',
        text: 'Lorem ipsum dolor sit amet, ipsum dolor sit amet consectetur adipiscing. Vitae semper quis lectus nulla at volutpat diam ut venenatis.'
    }
    
]

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
                        <ModulesWrapper :editable="false" :module = "module">
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
