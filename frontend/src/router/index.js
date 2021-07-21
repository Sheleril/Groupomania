// APPEL DES DEPENDANCES
import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Wall from "@/views/Wall.vue";
import Update from "@/views/Update.vue";
import OneMsg from '@/views/OneMsg.vue';
import User from '@/views/User.vue';
import ModifyPassword from '@/views/ModifyPassword.vue';
//import Comment from "@/views/Comment.vue";

import store from '@/store/index.js'

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    //props:true 
  },
  {
    name: 'wall',
    path: '/wall',
    component: Wall,
  },
  {
    name: 'update',
    path: '/update',
    component: Update,
  },
  {
    name: 'oneMsg',
    path: '/oneMsg/:id',
    component: OneMsg,
  },
  {
    name: 'userList',
    path: '/userList',
    component: User,
  },
  {
    name: 'ModifyPassword',
    path: '/modifypassword',
    component: ModifyPassword,
  },
  /*{
    name: 'comment',
    path: '/comment',
    component: Comment,
  },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//SECURISATION ROUTE SI PAS DE TOKEN RETOUR SUR PAGE LOGIN
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && store.state.user.userId === -1) next ({ name: 'login'})
  else next()
})

export default router;