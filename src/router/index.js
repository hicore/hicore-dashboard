import { createRouter, createWebHashHistory } from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode';
const routes = [
  {
    path: '/',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/analyses',
    name: 'Analyses',
    component: () => import('../views/sidebar/Analyses'),
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/match',
    name: 'Match',
    component: () => import('../views/sidebar/Match.vue'),
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/sidebar/Users.vue'),
    meta: {
      requestAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/sidebar/Settings.vue'),
    meta: {
      requestAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requestAuth)) {
    let token = localStorage.getItem('jwt');
    let decoded = VueJwtDecode.decode(token);

    if (token == null || Date.now() >= decoded.exp * 1000) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
