<template>
    <section>
        <article class='card' v-for='comment in comments' :key='comment.id'>
            <div v-if="comment.userId != undefined">
                <h3>{{comment.username}} a écris: </h3>
                <p class='content'>{{comment.content}}</p>
                <p class='end-date' >Le {{dateOfPost(comment.createdAt)}} </p>
                <div v-if="comment.userId == userId || user.isAdmin == true">
                    <i class="fas fa-trash-alt" @click="deleteComment(comment.id)" ></i>
                </div>
            </div>
            <div v-else >
                <p>{{comment.content}}</p>
            </div>
        </article>
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'SeeComment',

        computed: {
        ...mapState ({
            user: 'userInfos',
        })
    },

    //CREATION D'UN TABLEAU VIDE COMMENTS et RECUPERATION DE L'USERID
    data: function(){
        return{
            comments:[],
            userId: JSON.parse(localStorage.getItem('user')).userId,
        }
    },
    //LANCE LORSQUE LA PAGE S'OUVRE CETTE FONCTION
    mounted(){
        this.getAllComment();
    },
    methods: {
        //TROUVE MOI TOUT LES  COMMENTAIRES POUR LE POSTID DANS LA BARRE DE RECHERCHE
        getAllComment(){
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            const postId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/${postId}/allcomments`, {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(response => {
                this.comments = response.data
                console.log(this.comments)
            })
            .catch(error => {
                if(error.response.status == 404){
                    this.comments = [{content: `Il n'y a aucun commentaire pour ce message`}]
                } else {
                    console.log('Erreur API')
                }
            })
        },
        dateOfPost(date) {
            const event = new Date(date);
            const opt = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-Fr', opt);
        },
        deleteComment(commentId) {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            axios.delete(`http://localhost:3000/api/messages/mycomment/${commentId}/delete`, {
                headers: { Authorization: 'Bearer ' + token },
            }) .then(() => window.location.reload())
        },
    }
}
</script>

<style scoped>

.card{
    margin-bottom: 5%;
    font-size: x-large;
}
.content{
        margin: 10%;
}

section {
    margin-bottom: 5%;
    padding: 5%;
}
@media screen and (max-width: 480px){
    section {
        margin-bottom: 5%;
    }
}
/*
.card{
    margin: 15px;
}

.end-date{
    text-align: end;
}
*/

</style>