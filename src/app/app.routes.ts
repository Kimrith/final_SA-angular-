import { Routes } from '@angular/router';
import { Home } from '../Components/Home/home/home';
import { Cetecory } from '../Components/cetecory/cetecory';
import { About } from '../Components/Home/about/about';
import { Contact } from '../Components/Home/contact/contact';
import { Service } from '../Components/Home/service/service';
import { Login } from '../Components/Home/login/login';
import { Menu } from '../Components/Home/menu/menu';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'home',
        component: Cetecory,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'service',
        component: Service,
      },
      {
        path: 'contact',
        component: Contact,
      },
      {
        path: 'menu',
        component: Menu,
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
];
