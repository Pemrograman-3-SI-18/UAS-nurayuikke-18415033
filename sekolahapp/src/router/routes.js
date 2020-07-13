
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/DataTugas.vue') },
      { path: 'inputtugas', name: 'inputTugas', component: () => import('pages/admin/InputTugas.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('pages/admin/DataUser.vue') },
      { path: 'datatugas', name: 'dataTugas', component: () => import('pages/admin/DataTugas.vue') },
      { path: 'formedit/:id', name: 'formEditTugas', component: () => import('pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/Index') },
      { path: '/mywork', name: 'myWork', component: () => import('pages/user/MyWork') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
