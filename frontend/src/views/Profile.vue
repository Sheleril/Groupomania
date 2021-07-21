<template>
    <Navprofil />
    <Profil />
</template>

<script>
import { mapState } from 'vuex'

import Navprofil from '../components/Navprofil';
import Profil from '../components/Profil';

export default {
    name: 'Profile',
    components: {
        Navprofil,
        Profil
    },
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },
}

</script>

<style scoped>



</style>