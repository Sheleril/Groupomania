<template>
    <div class="logo">
        <img src='../assets/monochrome-black.svg' />
    </div>
    <div class="card">
        <h1 class="card_title" v-if="mode == 'login'" >Connexion</h1>
        <h1 class="card_title" v-else>Inscription</h1>
        <p class="card_subtitle" v-if="mode =='login'">Tu n'as pas encore de compte ? <span class="card_action" @click="goToCreateAccount()">Créer un compte</span></p>
        <p class="card_subtitle" v-else>Tu as déjà un compte ? <span class="card_action" @click="goToLogin()">Se connecter</span> </p>
        <div class="form-row">
            <input v-model="email" class="form-row_input" type="text" placeholder="Adresse mail" />
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="username" class="form-row_input" type="text" placeholder="Pseudo" />
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row_input" type="password" placeholder="Mot de passe" />
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse Mail et/ou Mot de passe invalide
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Adresse Mail déjà utilisée !
        </div>
        <div class="form-row">
            <button @click="login()" class="button" :class="{'button--disabled' : !validateFields}" v-if="mode == 'login'">
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
            <button @click="createAccount()" class="button" :class="{'button--disabled' : !validateFields}" v-else>
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>Créer mon compte</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Login',
    data: function () {
        return {
            mode: 'login',
            email: '',
            username: '',
            password: ''
        }
    },
    mounted: function() {
        if (this.$store.state.user.userId != -1) {
        this.$router.push('/profile');
        return;
        } else {
            this.$router.push('/');
        }
    },
    computed: {
        validateFields: function (){
            if (this.mode == 'create') {
                if (this.email != "" && this.username != "" && this.password != ""){
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState(['status'])
    }, 
    methods: {
        goToCreateAccount: function (){
            this.mode = 'create';
        },
        goToLogin: function (){
            this.mode = 'login';
        },
        login: function () {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }) .then (function(){
                self.$router.push('profile')
            }, function(error){
                console.log(error);
            })
        },
        createAccount: function (){
            const self = this;
            this.$store.dispatch('createAccount', {
                email: this.email,
                username: this.username,
                password: this.password
            }) .then (function(){
                 self.login();
            }, function(error){
                console.log(error);
            })
        },
    }
}

</script>

<style scoped>

  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }

    .form-row_input {
    padding:8px;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 25px;
    flex:1;
  }

    .card_action{
        color: lightskyblue;
    }
    .card_action:hover {
        cursor:pointer;
    }

  .logo {
      display: flex;
      justify-content: center;
      margin-bottom: 10%;
      margin-top: 8%;
  }

  .form-row_input::placeholder {
    color:#aaaaaa;
  }

  button{
    background: #59bffa;
    border-radius: 8px;
    font-weight: 800;
    font-size: x-large;
    border: none;
    width: 100%;
    padding: 25px;
    transition: .4s background-color;
    cursor:pointer;
}

.card{
    font-size: 1.3em;
    margin-bottom: 2%;
}


@media screen and (max-width: 650px){
    h1{
        font-size: 1.5em;
    }
  
    .logo img{
      display: flex;
      justify-content: center;
      margin-bottom: 10%;
      margin-top: 8%;
      width:75%;
    }  
}

</style>
