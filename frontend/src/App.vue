<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zen+Loop&display=swap');

* {
  /*font-family: 'Poppins', sans-serif;*/
  font-family: 'Zen Loop', cursive;
  font-weight: bold;
  margin:0;
  padding: 0;
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

body{
  background: linear-gradient(90deg, rgba(137,123,147,1) 0%, rgba(253,29,29,0.28925073447347693) 50%, rgba(137,123,147,1) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  flex-direction: column;
}
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}

/*RESPONSIVE SMARTPHONE*/ 
@media screen and (max-width: 650px){

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width:75%;
    background:white;
    border-radius: 16px;
    padding:32px;
  }

  .button {
    background: #59bffa;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }



}
/*

.card {
  max-width: 100%;
}
.card_title {
  text-align:center;
  font-weight: 800;
}
.card_subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

  .card_action {
    color:#99bdda;
    text-decoration: underline;
  }
  .card_action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: rgb(67,160,71);
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

*/ 
</style>
