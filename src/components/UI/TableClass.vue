<template>
    <article class="flex-col pl-28 flex items-center justify-center border border-solid border-x-gray-500 border-y-gray-500 py-3 gap-4 bg-gray-800 rounded-xl">
        <table class="text-center gap-2 w-full ">
            <tr class="text-xl text-gray-200 font-semibold">
                <th class="py-2">Nome da aula</th>
                <th class="py-2">Nome do módulo</th>
            </tr>
            <slot></slot>
        </table>
    </article>
</template>