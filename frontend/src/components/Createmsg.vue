<template>
    <section class="card" id="section-create">
        <h3>Crée mon message</h3>
        <form>
            <label for='my_title'>Titre : </label><input class="form-row_input" v-model="title" type="text" name="title" id='my_title' /> <br />
            <label for='my_content'>Contenu : </label><textarea id='my_content' class="form-row_input" v-model="content" type="text" name="content" rows="2" cols="20"></textarea> <br />
            <div class="img-form">
                <label for='gif'>Gif/Image : </label><input id='gif' class="form-row_input" type="file" name="file" ref= 'file' @change='selectFile()'/>
            </div>
        </form>
        <button aria-label="Publiez" class="button" type="submit"  @click="createMessage()">Publiez</button>
    </section>
</template>

<script>
import axios from "axios"

export default {
    name: 'CreateMessage',
    data: function () {
        return {
            title: '',
            content: '',
            file: null,
        }
    },
    methods: {
        //CREATION DE LA FONCTION CREATEMESSAGE 
        createMessage() {
            let userInfo = JSON.parse(localStorage.getItem('user'))
            let token = userInfo.token

            const data = new FormData() 
                data.append('title', this.title)
                data.append('content', this.content)
                data.append('attachment', this.file, this.file.name)
            
            axios.post('http://localhost:3000/api/messages/new', data, {
                headers: { Authorization: 'Bearer ' + token },
            }).then(() => this.$router.go(0))
        },
        //FAIRE REFERENCE AU FILE PLUS HAUT
        selectFile() {
            this.file = this.$refs.file.files[0]
        }
    }
}

</script>

<style scoped>

.card{
    font-size: 1.2em;
}
input, textarea{
    font-size: x-large;
}

#gif{
    font-size: small;
}

@media screen and (max-width: 480px){
    input{
        margin-bottom: 10%;
    }
    .img-form{
        padding: 5%;
    }
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
  width: 30%;
  cursor:pointer;
  margin-top: 5%;
}
form{
    display: flex;
    flex-direction: column;
}

</style>