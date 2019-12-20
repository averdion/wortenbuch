import Login from '../components/views/Login.vue';
import Words from '../components/views/Words.vue';
import Users from '../components/views/Users.vue';

export default [
    { path: '/', 
      component: Login,
    },
    { path: '/login', component: Login },
    { path: '/words', 
      component: Words
    },
    { path: '/users',
      component: Users
    }
  ]
