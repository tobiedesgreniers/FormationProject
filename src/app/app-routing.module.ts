import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { CreateComponent } from './components/create/create.component';
import { ProgressComponent } from './components/progress/progress.component';
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "sprint", component: SprintComponent, canActivate: [AuthGuardService] },
  { path: "create", component: CreateComponent, canActivate: [AuthGuardService] },
  { path: "progress", component: ProgressComponent, canActivate: [AuthGuardService] },
  { path: "**", redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
    HomeComponent, SprintComponent, CreateComponent, ProgressComponent
]