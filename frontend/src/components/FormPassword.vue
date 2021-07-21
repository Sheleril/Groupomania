<template>
<div>
    <h1>Modification du Mot de Passe</h1>
    <div class="card">
        <div class='pass'>
            <label for="password">Mot de passe actuel :</label> <br />
            <input v-model="password" type="password" id="password" class="form-row_input"/> <br/>
        </div>
        <div class="class">
            <label for="newpassword">Nouveau mot de passe :</label> <br />
            <input v-model="newpassword" type="password" id="newpassword" class="form-row_input"/> <br />
        </div>
        <button @click="updatePassword()" type="submit">Mettre à jour</button>
    </div>
</div>

</template>

<script>

import axios from 'axios';

export default {
    name: 'FormPassword',

    data: function(){
        return {
            password: '',
            newpassword: '',
        }
    },

    methods: {

            updatePassword() {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            let password = document.getElementById('password')
            let newpassword = document.getElementById('newpassword')
            this.password = password.value
            this.newpassword = newpassword.value
            
            axios.put('http://localhost:3000/api/users/me/uppass', {
                "password": this.password,
                "newpassword": this.newpassword,
            }, {
            headers: { Authorization: 'Bearer ' + token }
            })
            .then(() => {
                this.$router.push('/profile')
            })
            .catch(function(err){
                console.log(err)
            })
        }
    }
}

</script>

<style scoped>

input{
    width: 250px;
}

label{
    font-size: 25px;
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
  h1{
    text-align: center;
    padding-bottom: 5%;
  }

  button{
    background: #59bffa;
    border-radius: 8px;
    font-weight: 800;
    font-size: 25px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    cursor:pointer;
}
.class{
    padding-bottom: 5%;
}

@media screen and (max-width: 480px){
    h1{
        text-align: center;
        font-size: 1.5em;
    }
    .card{
        width: auto;
    }
}
   
</style>