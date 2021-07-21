<template>
    <header>
        <h1>Liste des utilisateurs de Groupomania</h1>
    </header>

    <section class="card">
        <article class="users" v-for='user in users' :key='user.id'>
           <h3> {{user.username}} </h3>
           <p> {{user.email}} </p>
           <p v-if="user.bio == null "> Cet utilisateur n'a pas de biographie </p>
           <p v-else > {{user.bio}} </p>
           <p v-if="user.isAdmin == true "> Cet utilisateur est Administrateur du réseau Social Groupomania </p>
           <p v-else > Cet utilisateur n'est pas Administrateur </p>
           <img :src=user.avatar alt="Image de l'utilisateur" />
           <button v-if="user.id != userId" @click="deleteUserByAdmin(user.id)" >Supprimer ce profil</button>
        </article>
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'AllUsers',
    data: function(){
        return{
            users:[],
            userId: '',
        }
    },
    mounted(){
        //APPEL DE LA FONCTION AU LANCEMENT DE LA PAGE 
        this.getAllUser();
    },
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },
    methods: {
        //FONCTION POUR RECUPERER TOUT LES UTILISATEURS
        getAllUser(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.get('http://localhost:3000/api/users/allusers', {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(response => {
                this.users = response.data
                this.userId = this.user.id
            })
        },
        deleteUserByAdmin(id){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.delete(`http://localhost:3000/api/users/allusers/${id}`, {
                headers: { Authorization: 'Bearer ' + token },
            }) .then(() => window.location.reload())
        }
    }
}
</script>

<style scoped>

.users{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5%;
    font-size: 1.4em;
}

img{
    max-width: 45%;
}

.card{
    margin-bottom: 2%;
}

  button{
    background: #59bffa;
    border-radius: 8px;
    font-weight: 800;
    font-size: 20px;
    border: none;
    margin-top: 2%;
    padding: 16px;
    transition: .4s background-color;
    cursor:pointer;
}

@media screen and (max-width: 480px){
    .users{
        font-size: 1.2em;
    }
}

</style>