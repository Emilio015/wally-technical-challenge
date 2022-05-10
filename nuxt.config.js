export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'wally-technical-challenge',
        htmlAttrs: {
            lang: 'es'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap');" }
        ],
        script: [
            { type: 'text/javascript', src: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB794yCkFpBgOFULAG3jAlqIFf11YInnak' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'bootstrap-vue/nuxt',
        '@nuxtjs/toast'
    ],

    toast: {
        position: 'top-center',
        duration: 3000,
    },

    axios: {
        baseURL: 'http://localhost:8000/api'
    },

    bootstrapVue: {
        bootstrapCSS: true, // Or `css: false`
        bootstrapVueCSS: true, // Or `bvCSS: false`
        icons: true
    },

    auth: {
        redirect: {
            login: '/login',
            logout: '/login',
            home: '/'
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/dashboard/login', method: 'post', propertyName: 'data.accessToken' },
                    logout: { url: '/dashboard/logout', method: 'post' },
                    user: { url: '/dashboard/user', method: 'get', propertyName: 'data' }
                },
                tokenRequired: true,
                autoFetchUser: false
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    router: {
        middleware: ['auth']
    }

}