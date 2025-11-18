import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoomComponent } from './components/room/room.component';
import { CanActivateRoom } from './guards/room.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    canActivate: [CanActivateRoom],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  }
];
