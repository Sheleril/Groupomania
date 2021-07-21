<template>
<Navbar />
<FormPassword />

</template>

<script>
import Navbar from '../components/Navbar';
import FormPassword from '../components/FormPassword';

export default {
    name: 'ModifyPassword',

    components: { 
        Navbar,
        FormPassword,
    },
}
</script>

