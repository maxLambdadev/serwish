import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutQualityComponent } from './about-quality.component';

const routes: Routes = [
    {
        path: '',
        component: AboutQualityComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutQualityRouting {

}