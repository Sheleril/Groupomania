<template>
    <header>
        <h1>Actualités</h1>
    </header>

    <section>
        <article class='card' v-for='post in posts' :key='post.id'>
            <router-link :to=" { name: 'oneMsg', params: { id: post.id }} ">
            <div class="mon-article">
                <h3>{{post.title}}</h3>
                <img :src=post.attachment :alt="'Image du Post ' + post.id"/>
                <p class="content">{{post.content}}</p>
                <p>Crée le {{dateOfPost(post.createdAt)}}, par {{post.username}}</p>
            </div>
            </router-link>
            <div>
                <p><i class="fas fa-heart"></i>{{ post.likes }}</p> 
            </div>
        </article>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AllPost',
    data: function(){
        return{
            posts:[],
        }
    },
    mounted(){
        //APPEL DE LA FONCTION AU LANCEMENT DE LA PAGE 
        this.getAllPost();
    },
    methods: {
        //FONCTION POUR RECUPERER TOUT LES POSTS
        getAllPost(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.get('http://localhost:3000/api/messages', {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(messages => {
                this.posts = messages.data
            })
        },

        //CREATION DE LA  FONCTION POUR L'HEURE 
        dateOfPost(date){
            const event = new Date(date);
            const opt = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-Fr', opt);
        },
        // FONCTION POUR CREE LE LIKE
        createLike(postId){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.post(`http://localhost:3000/api/messages/${postId}/like`, {}, {
                headers: { Authorization: 'Bearer ' + token },
            }) .then(() => this.$router.go(0))
        },
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    color: black;
}

.mon-article img {
    width: 75%;
}
.mon-article{
    background-color: white;
}

.card{
font-size: x-large;
}


@media screen and (max-width: 480px){
    h3{
        font-size: 1.5em;
    }
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card{
    margin-bottom: 5%;
}
.content{
    margin: 10%;
}

</style>