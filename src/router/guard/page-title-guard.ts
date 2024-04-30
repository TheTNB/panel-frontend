import type { Router } from 'vue-router'

import { title } from '@/main'
import { trans } from '@/i18n/i18n'

export function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title
    if (pageTitle) document.title = `${trans(pageTitle).value} | ${title.value}`
    else document.title = title.value
  })
}
