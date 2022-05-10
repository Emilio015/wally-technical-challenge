export const state = () => ({
    drawer: true
})

export const mutations = {
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    setDrawer(state, bool) {
        state.drawer = bool
    },
}