import { Router } from '@vaadin/router';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from './urls.js';

export function init(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    {
      path: '/',
      redirect: EMPLOYEE_LIST
    },
    {
      path: EMPLOYEE_LIST,
      component: 'employee-list',
      action: () => {
        import('../views/employee-list.js');
      }
    },
    {
      path: NEW_EMPLOYEE,
      component: 'employee-new',
      action: () => {
        import('../views/employee-new.js');
      }
    },
    {
      path: '(.*)',
      component: 'app-404',
      action: () => {
        import('../views/404.js');
      }
    }
  ]);
}
