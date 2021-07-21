<template>
    <aside class="comment">
        <h3>Ajouter un commentaire</h3>
            <form>
                <textarea class="form-row_input" v-model="content" type="text" name="content" rows="2" cols="20"></textarea>
            </form>
        <button class="button" @click="addComment()">Envoyer</button>
    </aside>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateComment',
    data: function () {
        return {
            content: '',
        }
    },
    methods: {
        //CREATION DE LA FONCTION ADDCOMMENT POUR CREE UN COMMENTAIRE
        //this.$router.go(0)
        addComment() {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token
            let postId = this.$route.params.id

            let content = this.content
            
            axios.post(`http://localhost:3000/api/messages/${postId}/comment`, { content }, {
                headers: { Authorization: 'Bearer ' + token }
            }).then(() => this.$router.push(`/wall`));
        },
    }
}

</script>

<style scoped>

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
    button {
    background: #59bffa;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 20px;
    border: none;
    padding: 16px;
    transition: .4s background-color;
    margin-bottom: 30px;
    cursor:pointer;
    
  }

  h3 {
    font-size: x-large;
  }

  textarea{
    width: 15em;
    font-size: 1.2em;
    font-weight: bold;
}

form{
  color: black;
}
/*
.comment{
    display: flex;
    flex-direction: column;
    align-items: center;
}

  button {
    background: #59bffa;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    padding: 16px;
    transition: .4s background-color;
    margin-bottom: 30px;
        width: 35%;
  }
    .form-row_input {
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    margin-bottom: 10px;
  }

  textarea{
    width: 396px;
    height: 51px;
  }

.button:hover {
  cursor:pointer;
  background: rgb(67,160,71);
}
*/
</style>