import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'create-contratista/:idusuario', loadChildren: './pages/create-contratista/create-contratista.module#CreateContratistaPageModule' },  { path: 'map', loadChildren: './pages/modal/map/map.module#MapPageModule' },
  { path: 'anuncios', loadChildren: './pages/anuncios/anuncios.module#AnunciosPageModule' },
  { path: 'crud-anuncio', loadChildren: './pages/modal/crud-anuncio/crud-anuncio.module#CrudAnuncioPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
