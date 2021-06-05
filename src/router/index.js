import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/unauth/LoginForm')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/unauth/RegistrationForm')
  }
];

const router = new VueRouter({
  routes
});

export default router;
