<template>
    <div class="card">
        <h1 class="card_title">Welcome Home {{user.username}} !</h1>
        <img v-if='user.avatar == null' src='../assets/avatar.png' />
            <img v-else :src="user.avatar" alt="Avatar de l'utilisateur"/>
        <div>
            <h3>Mes Informations Personnelles :</h3>
            <p>Surnom: {{user.username}}</p>
            <p>E-Mail: {{user.email}}</p>
        </div>
        <p v-if="user.bio == null "> Vous n'avez pas encore écris votre Bio, rendez-vous sur la page "Modifier mon profil"</p>
        <p v-else>Ma bio : {{user.bio}}</p>
        <p v-if="user.isAdmin == true " >Votre compte est défini comme Administrateur</p>
        <p class="update-profil"><router-link to="/update" > Modifier mon profil</router-link></p>
        <p v-if="user.isAdmin == true " class="update-profil"><router-link to="/userList" >Voir les utilisateurs</router-link></p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Profil',
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },
}

</script>

<style scoped>

a {
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    color: black;
}

.update-profil {
    background-color: gainsboro;
    border-radius: 15px;
    margin: 3%;
}

.navbar {
    max-width: 100%;
}

img{
    max-width: 50%;
    border: solid 5px black;
    border-radius: 25%;
}

.card{
    font-size: 1.5em;
}

@media screen and (max-width: 650px){
    
}

/*

body {
    background-image: linear-gradient(62deg, #8a7efb 0%, #818286 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}

.card p {
    display: flex;
    justify-content: center;
}

.card {
    
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    align-items: center;
}
.card button{
    margin-top: 15%;
}

.update-profil{
    background-color: darkgray;
    border-radius: 15px;
    margin: 3%;
}

.update-profil:hover{
    color: black;
}

*/
</style>