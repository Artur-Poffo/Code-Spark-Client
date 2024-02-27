<template>
    <aside class="h-3/4 w-80 flex flex-col gap-8 rounded-xl fixed top-32 left-8 bottom-24 bg-gray-800 px-10">
        <header class="text-center flex flex-col items-center gap-6">
            <div class="py-5">
                <h1 class="font-righteous text-2xl text-white">Nome do Usuário</h1>
                <span class="text-md text-gray-200">email.user@gmail.com</span>
            </div>

            <img class="w-40 h-40 rounded-xl"
                src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                alt="Imagem do Usuário">
        </header>

        <nav class="py-2">
            <ul class="text-lg">
                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" to="/dashboard">Dashboard</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" to="/registeredstudents">Estudantes Inscritos</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" to="/modules">Módulos</router-link>
                </li>

                <li class="hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" to="/classes">Aulas</router-link>
                </li>

                <li class="py-10 hover:opacity-80 transition-opacity">
                    <router-link active-class="active-link" to="/settings">Configurações</router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>