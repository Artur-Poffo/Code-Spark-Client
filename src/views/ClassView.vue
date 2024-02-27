<script setup lang="ts">
import ModuleBar from '@/components/Navigation/ModuleBar.vue';
import ModuleText from '@/components/UI/ModuleText.vue'
import ButtonModule from '@/components/UI/ButtonModule.vue';
import TableClass from '@/components/UI/TableClass.vue';
import type { ITable } from '@/interfaces/ITable';
import DeleteModuleButton from '@/components/UI/DeleteModuleButton.vue';
import EditModuleButton from '@/components/UI/EditModuleButton.vue';

const tables: ITable[] = [
    {
        id: 1,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 2,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 3,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 4,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 5,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 6,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 7,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 8,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 9,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 10,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 11,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 12,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 13,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 14,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 15,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 16,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 17,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 18,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 19,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
    },
    {
        id: 20,
        name: 'Primeira Aula',
        module: 'O que vamos aprender?'
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

            <ModuleText class="pb-8" title="Aulas" text="20 aulas registradas" subtitle="Aulas cadastradas no curso">
            </ModuleText>

            <TableClass class="py-5">
                
                <tr v-for="table in tables " :key="table.id">
                    <td class="border border-solid border-gray-500 text-lg font-medium text-gray-300 py-2">{{
                        table.name }}
                    </td>
                    <td class="border border-solid border-gray-500 text-lg font-medium text-gray-300 py-2">{{
                        table.module
                    }}</td>
                    <aside class="flex items-center justify-center w-36 gap-2 py-2">
                    <DeleteModuleButton></DeleteModuleButton>
                    <EditModuleButton></EditModuleButton>
            </aside>
                </tr>
            
            </TableClass>
        </section>

        <section>
            <ButtonModule text="Adicionar aula">
            </ButtonModule>
        </section>
    </div>
</template>