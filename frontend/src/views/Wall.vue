<template>
    <Navbar />
    <Createmsg />
    <AllPost />
</template>


<script>
import Navbar from '../components/Navbar';
import Createmsg from '../components/Createmsg';
import AllPost from '../components/AllPost';

export default {
    name: 'Wall',
    components: {
        Navbar,
        Createmsg,
        AllPost,
    },
}

</script>


<style scoped>

</style>