import { Home, Docs, Swagger } from './../components/app';
import { UserList, UserForm } from './../components/users';
import { RoleList, RoleForm } from './../components/roles';
import { Dashboard } from './../components/dashboard';
import { ReportList } from './../components/reports';
import { NotificationList } from './../components/notifications';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/dashboard/:id',
    component: Dashboard,
  },
  {
    path: '/reports',
    exact: true,
    component: ReportList,
  },
  {
    path: '/notifications',
    exact: true,
    component: NotificationList,
  },
  {
    path: '/docs/app',
    exact: true,
    component: Docs,
  },
  {
    path: '/docs/api',
    component: Swagger,
  },
  {
    path: '/settings/users',
    exact: true,
    component: UserList,
  },
  {
    path: '/settings/users/:id',
    component: UserForm,
  },
  {
    path: '/settings/roles',
    exact: true,
    component: RoleList,
  },
  {
    path: '/settings/roles/:id',
    component: RoleForm,
  },
];

export default Routes;
