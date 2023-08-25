import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { ServicesComponent } from './services.component';

const routes: Routes = [
    {
        path: ':catslug',
        component: ServicesComponent
    },
    {
        path: 'details/:id/:slug',
        component: ServiceDetailsComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRouting {

}