<script setup lang="ts">

defineProps<{
    title: string
    text: string
    subtitle: string
}>()

</script>

<template>
    <aside class="flex flex-col">
        <header class="gap-2 pb-7">
            <h1 class="text-2xl text-green-500 font-righteous">{{title}}</h1>
        </header>
        <div class="h-auto py-3 w-full text-xl rounded-xl font-righteous bg-gray-800 text-center text-white">
            {{ text }}
        </div>
        <span class="text-lg font-semibold font-roboto pt-7 text-white">{{subtitle}}</span>
            <slot></slot>
    </aside>
</template>