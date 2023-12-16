import { createStore } from 'vuex'

export default createStore({
    state: {
        tasks: [],
        isOpen: true,
        name: '',
    },
    mutations: {
        // Define your mutations here
        // For example:
        // increment(state) {
        //   state.count++
        // }
    },
    actions: {
        // Define your actions here
        // For example:
        // increment(context) {
        //   context.commit('increment')
        // }
    },
    getters: {
        // Define your getters here
        // For example:
        // count: state => state.count
    },
    modules: {
        // If you have any modules, define them here
    }
})