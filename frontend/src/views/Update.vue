<template>
    <Navbar />

    <header>
        <h1>Modifier mon profil</h1>
    </header>

    <main>
        <section class="card">
            <img v-if='user.avatar == null' src='../assets/avatar.png' />
            <img v-else :src="user.avatar" alt="Avatar de l'utilisateur"/>
            <div>
                <p v-if="user.bio == '' "> Vous n'avez pas encore écris votre Bio</p>
                <p v-else>Ma biographie actuelle: {{user.bio}}</p> <br />
            </div>
            <form class="avatar-form">
                <label>Avatar :</label><input type="file" name="avatar" ref="file" @change="selectFile()"/> <br/>
                <label>Changer ma Biographie :</label><textarea id="bio" class="form-row_input" type="text" name="bio" placeholder="Qu'avez-vous à dire ? " maxlength="400" width="100%"></textarea>
            </form>
            <button class="modifbutton" @click="modifyProfil()" >Actualiser mon profil</button> <br />
            <button class='button'><router-link to="/ModifyPassword" >Modifier mon mot de passe</router-link></button>
        </section>
        <h2> OU </h2>
        <button @click="deleteProfil()" type="submit" class="delete">Supprimer mon compte définitivement</button>
    </main>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';

import Navbar from '../components/Navbar';

export default {
    name: 'Update',
    data: function(){
        return{
            file: null,
            bio: '',
        }
    },

    components: {
        Navbar
    },
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },
    methods: {
        deleteProfil() {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.delete('http://localhost:3000/api/users/me/delete', {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then (() => {
                this.$store.commit('logout');
                this.$router.push('/');
            })
        },
        selectFile(){
            this.file= this.$refs.file.files[0]
        },
        modifyProfil() {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            let content = document.getElementById('bio')
            this.bio = content.value

            const data = new FormData()
                if (this.file) {
                    if(this.bio){
                        data.append('avatar', this.file, this.file.name);
                        data.append('bio', this.bio);
                        console.log('Avatar et Bio update')
                    } else {
                        data.append('avatar', this.file, this.file.name);
                    }
                } else if (this.bio || this.bio == ''){
                    data.append('bio', this.bio)
                }

            axios.put('http://localhost:3000/api/users/me/update', data , {
            headers: { Authorization: 'Bearer ' + token }
            })
            .then(() => {
                this.$router.push('/profile')
            })

        },
    },
}
</script>

<style scoped>

.modifbutton{
    font-size: 25px;
}

.card{
    font-size: x-large;
}

img{
    max-width: 55%;
    border: solid 5px black;
    border-radius: 25%;
    margin-bottom: 5%;
}

a {
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    color: black;
}

.button{
        font-size: x-large;
}

.delete{
        font-size: x-large;
}

@media screen and (max-width: 480px){
    .card{
        width: min-content;
    }
    img{
       max-width: 75%;
       margin-bottom: 10%;
    }
    input{
        padding-bottom: 15%;
    }
    textarea{
        margin-bottom: 15%;
    }
    .delete{
    background: brown;
}
}

button{
    background: #59bffa;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    cursor:pointer;
}

.delete{
    background: brown;
    margin-bottom: 10%;
}

h2{
    text-align: center;
}

h1{
    padding-bottom: 10%;
}
.avatar-form{
    display: flex;
    flex-direction: column;
}
textarea{
    margin-bottom: 15%;
}
  .form-row_input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }

</style>