function page(path) {
  return () => import(/* webpackChunkName: '' */ `../pages/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', redirect: { name: 'home' } },
  { path: '/home', name: 'home', component: page('home'), },

  {
    path: '/offices',
    component: page('offices/base.vue'),
    name: 'offices',
    redirect: { name: 'offices.index' },
    children: [
      { path: '', name: "offices.index", component: page('offices/index.vue') },
      { path: ':code', name: 'offices.report', component: page('offices/report.vue'), props: true },
    ]
  },

  {
    path: '/units',
    component: page('units/base.vue'),
    name: 'units',
    redirect: { name: 'units.index' },
    children: [
      { path: '', name: "units.index", component: page('units/index.vue') },
      { path: ':code', name: 'units.report', component: page('units/report.vue'), props: true },
    ]
  },
  {
    path: '/upload',
    component: page('admin/uploadExcel.vue'),
    name: 'admin.uploadExcel',
  },

  { path: '*', component: page('errors/404.vue') }
]
