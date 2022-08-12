import type { Router } from 'vue-router'

export default function (router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })
}
