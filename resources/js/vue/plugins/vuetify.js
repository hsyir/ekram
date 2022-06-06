import Vue from 'vue'

import Vuetify, {
    VApp,
    VAppBar,
    VMain,
    VContainer,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition,
    VListItemAvatar,
    VListItem,
    VList,
    VSelect,
} from 'vuetify/lib'

Vue.use(Vuetify, {
    components: {
        VApp, VAppBar,
        VMain,
        VContainer,
        VNavigationDrawer,
        VFooter,
        VFadeTransition,
        VListItemAvatar,
        VListItem,
        VList,
        VSelect,
    }
})

import { fa } from 'vuetify/lib/locale'

export default new Vuetify({
    lang: {
        locales: { fa },
        current: 'fa',
    },
    rtl: true,
    icons: {
        iconfont: 'mdi' // default - only for display purposes
    },
    theme: {
        themes: {
            light: {
                primary: '#550085',
                secondary: '#696969',
                accent: '#8c9eff', 
                error: '#b71c1c'
            }
        }
    }
})
