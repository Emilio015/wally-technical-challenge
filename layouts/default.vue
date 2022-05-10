<template>
    <div>
        <b-navbar id="layout-navbar" toggleable="lg" type="light">
            <NuxtLink to="/">
                <b-img src="~assets/images/wally-brand.svg" fluid-grow alt="Wally"></b-img>
            </NuxtLink>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <NuxtLink
                        v-if="!$auth.loggedIn"
                        :to="{ name: 'login' }"
                        exact-active-class="is-active"
                    >
                        Iniciar sesión
                    </NuxtLink>

                    <NuxtLink
                        v-if="!$auth.loggedIn"
                        :to="{ name: 'register' }"
                        exact-active-class="is-active"
                    >
                        Regístrate
                    </NuxtLink>

                    <NuxtLink
                        v-if="$auth.loggedIn"
                        :to="{ name: 'favorites' }"
                        exact-active-class="is-active"
                    >
                        Mis Favoritos
                    </NuxtLink>

                    <b-nav-item-dropdown right v-if="$auth.loggedIn">
                        <template #button-content>
                            {{ userAuthenticated }}
                        </template>
                        <b-dropdown-item href="#" @click="logout">Cerrar Sesión</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-container fluid="md">
            <Nuxt />
        </b-container>
    </div>
</template>

<script>

    export default {
        computed: {
            userAuthenticated (){
                return `${this.$auth.user.names} ${this.$auth.user.surnames}`;
            }
        },
        methods: {
            logout(){
                this.$auth.logout();
            }
        }
    }

</script>