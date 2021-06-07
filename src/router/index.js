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
  },
  {
    path: '/profile',
    component: () => import('../views/user/UserProfile'),
    children: [
      {
        path: '',
        name: 'PersonalData',
        component: () => import('../components/user/PersonalData')
      },
      {
        path: 'privacy',
        name: 'PrivacyData',
        component: () => import('../components/user/PrivacyData')
      },
      {
        path: 'notifications',
        name: 'NotificationPreferences',
        component: () => import('../components/user/NotificationPreferences')
      }
    ]
  },
  {
    path: '/:username',
    name: 'ProfileView',
    component: () => import ('../views/user/ProfileView')
  }
];

const router = new VueRouter({
  routes
});

export default router;
