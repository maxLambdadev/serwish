import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(mod => mod.HomePageModule)
  },
  {
    path: 'specialists',
    loadChildren: () =>
      import('./pages/specialists/specialists.module').then(mod => mod.SpecialistsPageModule)
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/services.module').then(mod => mod.ServicesPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./pages/wishlist/wishlist.module').then(mod => mod.WishlistPageModule)
  },
  {
    path: 'my-services',
    loadChildren: () =>
      import('./pages/my-services/my-services.module').then(mod => mod.MyServicesPageModule)
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blogs/blogs.module').then(mod => mod.BlogsPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then(mod => mod.ProfilePageModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then(mod => mod.SearchPageModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then(mod => mod.ContactPageModule)
  },
  {
    path: 'policy',
    loadChildren: () =>
      import('./pages/policy/policy.module').then(mod => mod.PolicyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./pages/terms/terms.module').then(mod => mod.TermsPageModule)
  },
  {
    path: 'about-specialists',
    loadChildren: () =>
      import('./pages/about-specialists/about-specialists.module').then(mod => mod.AboutSpecialistsPageModule)
  },
  {
    path: 'about-quality',
    loadChildren: () =>
      import('./pages/about-quality/about-quality.module').then(mod => mod.AboutQualityPageModule)
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./pages/help/help.module').then(mod => mod.HelpPageModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./pages/not-found/not-found.module').then(mod => mod.NotFoundModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/notfound' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
      preloadingStrategy: NoPreloading
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
