import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1f46bb26 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _66683014 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _176c0e8f = () => interopDefault(import('..\\pages\\manageSystem\\selectCourse.vue' /* webpackChunkName: "pages/manageSystem/selectCourse" */))
const _924e78bc = () => interopDefault(import('..\\pages\\manageSystem\\selectDate.vue' /* webpackChunkName: "pages/manageSystem/selectDate" */))
const _04a37384 = () => interopDefault(import('..\\pages\\manageSystem\\selectEmp.vue' /* webpackChunkName: "pages/manageSystem/selectEmp" */))
const _41a8f64f = () => interopDefault(import('..\\pages\\manageSystem\\selectRoom.vue' /* webpackChunkName: "pages/manageSystem/selectRoom" */))
const _73ed4a54 = () => interopDefault(import('..\\pages\\teacher\\score.vue' /* webpackChunkName: "pages/teacher/score" */))
const _0c134621 = () => interopDefault(import('..\\pages\\teacher\\testNo.vue' /* webpackChunkName: "pages/teacher/testNo" */))
const _34f25bc4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _1f46bb26,
    name: "inspire"
  }, {
    path: "/test",
    component: _66683014,
    name: "test"
  }, {
    path: "/manageSystem/selectCourse",
    component: _176c0e8f,
    name: "manageSystem-selectCourse"
  }, {
    path: "/manageSystem/selectDate",
    component: _924e78bc,
    name: "manageSystem-selectDate"
  }, {
    path: "/manageSystem/selectEmp",
    component: _04a37384,
    name: "manageSystem-selectEmp"
  }, {
    path: "/manageSystem/selectRoom",
    component: _41a8f64f,
    name: "manageSystem-selectRoom"
  }, {
    path: "/teacher/score",
    component: _73ed4a54,
    name: "teacher-score"
  }, {
    path: "/teacher/testNo",
    component: _0c134621,
    name: "teacher-testNo"
  }, {
    path: "/",
    component: _34f25bc4,
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
