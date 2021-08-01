<template>
        <div class='navbar'>
            <img src='../assets/icon.svg' class='petit-logo' alt="Favicon Groupomania"/>
            <div class="menu">
                <ul>
                    <li class="menu-link"> <router-link to="/wall">Mur d'Actualités</router-link> </li>
                    <li class="menu-link"> <a href="mailto: sheleril68@gmail.com">Besoin d'aide</a></li>
                    <li class="menu-link"><a @click="logout()">Déconnexion</a></li>
                </ul>
            </div>
        </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    
    mounted: function() {
        console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos');
    },
    //APPEL DE MAPSTATE POUR LE USER.USERNAME EN HAUT DE LA PAGE
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },
    methods: {
        logout: function() {
            this.$store.commit('logout');
            this.$router.push('/');
        },
    }
};

</script>

<style scoped>

@media screen and (max-width: 480px){
    a{
        font-size: 1.8em;
    }
}


.navbar{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    background-color: white;
}

ul{
    display: flex;
    list-style: none;
    padding: 0;
    /*margin: 0 20px 0 0;*/
}

.petit-logo{
    width: 50px;
}

a {
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    color: black;
    font-size: 2em;
}


@media screen and (max-width: 480px){
    ul{
        font-size: x-small;
    }
}

</style>