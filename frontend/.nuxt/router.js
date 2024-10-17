import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8fd15eb6 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _59d45e74 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _4eecb5e8 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6f345ad7 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _79d3ec3f = () => interopDefault(import('../pages/manageSystem/doc1.vue' /* webpackChunkName: "pages/manageSystem/doc1" */))
const _79e203c0 = () => interopDefault(import('../pages/manageSystem/doc2.vue' /* webpackChunkName: "pages/manageSystem/doc2" */))
const _79f01b41 = () => interopDefault(import('../pages/manageSystem/doc3.vue' /* webpackChunkName: "pages/manageSystem/doc3" */))
const _79fe32c2 = () => interopDefault(import('../pages/manageSystem/doc4.vue' /* webpackChunkName: "pages/manageSystem/doc4" */))
const _7a0c4a43 = () => interopDefault(import('../pages/manageSystem/doc5.vue' /* webpackChunkName: "pages/manageSystem/doc5" */))
const _11f07d06 = () => interopDefault(import('../pages/manageSystem/selectCourse.vue' /* webpackChunkName: "pages/manageSystem/selectCourse" */))
const _7bff4be0 = () => interopDefault(import('../pages/manageSystem/selectDate.vue' /* webpackChunkName: "pages/manageSystem/selectDate" */))
const _55ba27a0 = () => interopDefault(import('../pages/teacher/score.vue' /* webpackChunkName: "pages/teacher/score" */))
const _5cdc4076 = () => interopDefault(import('../pages/teacher/testNo.vue' /* webpackChunkName: "pages/teacher/testNo" */))
const _dfa68946 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _8fd15eb6,
    name: "inspire"
  }, {
    path: "/login",
    component: _59d45e74,
    name: "login"
  }, {
    path: "/register",
    component: _4eecb5e8,
    name: "register"
  }, {
    path: "/test",
    component: _6f345ad7,
    name: "test"
  }, {
    path: "/manageSystem/doc1",
    component: _79d3ec3f,
    name: "manageSystem-doc1"
  }, {
    path: "/manageSystem/doc2",
    component: _79e203c0,
    name: "manageSystem-doc2"
  }, {
    path: "/manageSystem/doc3",
    component: _79f01b41,
    name: "manageSystem-doc3"
  }, {
    path: "/manageSystem/doc4",
    component: _79fe32c2,
    name: "manageSystem-doc4"
  }, {
    path: "/manageSystem/doc5",
    component: _7a0c4a43,
    name: "manageSystem-doc5"
  }, {
    path: "/manageSystem/selectCourse",
    component: _11f07d06,
    name: "manageSystem-selectCourse"
  }, {
    path: "/manageSystem/selectDate",
    component: _7bff4be0,
    name: "manageSystem-selectDate"
  }, {
    path: "/teacher/score",
    component: _55ba27a0,
    name: "teacher-score"
  }, {
    path: "/teacher/testNo",
    component: _5cdc4076,
    name: "teacher-testNo"
  }, {
    path: "/",
    component: _dfa68946,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
