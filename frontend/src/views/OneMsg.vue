<template> 

    <Navprofil />
    <div class="card">
        <h3>{{post.title}}</h3>
        <img :src=post.attachment alt="Image du post"/>
        <p class="content">{{post.content}}</p>
        <p>Crée le {{dateOfPost(post.createdAt)}}, par {{post.username}}</p>
        <i @click="createLike(post.id)" id="btn-like" class="far fa-heart" aria-label="Bouton J'aime" ></i> 
        <p>{{ likes }}</p> 
    </div>
    <div class='delete-btn' v-if="post.UserId == userId || user.isAdmin == true">
        <button @click="deleteMessage()"  class="button" aria-label='Supprimer ce message' >Supprimer ce message</button>
    </div>

    <CreateComment />
    <SeeComment />
</template>


<script>
import axios from 'axios';
import { mapState } from 'vuex'
import CreateComment from '../components/CreateComment';
import Navprofil from '../components/Navprofil';
import SeeComment from '../components/SeeComment';

export default {
    name: 'OneMsg',
    computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },

    data: function(){
        return{
            post:[],
            userId: JSON.parse(localStorage.getItem('user')).userId,
            liked: '',
            likes: [],
        }
    },
    components: {
        CreateComment,
        Navprofil,
        SeeComment,
    },
    mounted(){
        this.getOnePost();
        this.getLikes();
    },
    methods: {
        getOnePost(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            const postId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/myMessage/${postId}`, {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(response => {
                this.post = response.data
                this.likes = response.data.likes
            })
        },
        dateOfPost(date) {
            const event = new Date(date);
            const opt = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-Fr', opt);
        },
        createLike(postId){
            let btnLike = document.getElementById('btn-like')
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.post(`http://localhost:3000/api/messages/${postId}/like`, {}, {
                headers: { Authorization: 'Bearer ' + token },
            }) .then(response => {
                if(response.data.message ==  `J'aime ce message`){
                    this.likes ++
                    btnLike.classList.remove('far')
                    btnLike.classList.add('fas')
                } else if (response.data.message == `Je n'aime plus ce message`){
                    this.likes --
                    btnLike.classList.remove('fas')
                    btnLike.classList.add('far')
                }
            })
        },
        getLikes(){
            let btnLike = document.getElementById('btn-like')
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            const postId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/${postId}/alllike`, {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then(response => {
                this.liked = response.data
                if(this.liked != '') {
                    btnLike.classList.remove('far')
                    btnLike.classList.add('fas')
                }
            })
        },
        deleteMessage(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            const postId = this.$route.params.id

            axios.delete(`http://localhost:3000/api/messages/myMessage/${postId}/delete`, {
                headers: { Authorization: 'Bearer ' + token },
            }) .then(() => this.$router.push('/wall'));
        }
    },
    
}

</script>

<style scoped>

img{
    width: 60%;
}
.content{
    margin: 5%;
}

h3{
    font-size: xx-large;
}

button{
    background: #59bffa;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 25px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    margin-top: 15%;
    cursor:pointer;
}

aside{
    padding-top: 5%;
    text-align: center;
}

.card{
    font-size: x-large;
}

textarea{
    width: 15em;
    font-size: 1.2em;
    font-weight: bold;
}

@media screen and (max-width: 480px){
.content{
    margin: 10%;
}

#btn-like{
    padding-top: 5%;
}

.card{
    margin-bottom: 5%;
    font-size: 1.3em;
}

aside{
    
    text-align: center;
}
h3{
    font-size: x-large;
}

}

</style>