<template>
    <Navbar />
    <AllUsers /> 

</template>


<script>
import Navbar from '../components/Navbar';
import AllUsers from '../components/AllUsers';


export default {
    name: 'User',
    components: {
        Navbar,
        AllUsers,

    },
}

</script>


<style scoped>

</style>