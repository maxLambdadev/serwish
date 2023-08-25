import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutSpecialistsComponent } from './about-specialists.component';

const routes: Routes = [
    {
        path: '',
        component: AboutSpecialistsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutSpecialistsRouting {

}