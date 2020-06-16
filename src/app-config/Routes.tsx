import { Home, Docs, Swagger, Settings } from './../components/app';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/docs',
    exact: true,
    component: Docs,
  },
  {
    path: '/docs/api',
    component: Swagger,
  },
  {
    path: '/settings',
    component: Settings,
  },
];

export default Routes;
