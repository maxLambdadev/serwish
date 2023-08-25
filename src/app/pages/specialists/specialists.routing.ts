import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpecialistDetailsComponent } from "./specialist-details/specialist-details.component";
import { SpecialistsComponent } from './specialists.component';

const routes: Routes = [
    {
        path: '',
        component: SpecialistsComponent
    },
    {
        path: ':id/:slug',
        component: SpecialistDetailsComponent,
        data: { breadcrumb: "SPECIALIST", animation: 'SpecialistDetailsPage' }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialistsRouting {

}