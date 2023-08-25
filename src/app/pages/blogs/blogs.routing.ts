import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { BlogsComponent } from './blogs.component';

const routes: Routes = [
    {
        path: '',
        component: BlogsComponent
    },
    {
        path: ':id/:slug',
        component: BlogDetailsComponent,
        data: { breadcrumb: "BLOG", animation: 'BlogDetailsPage' }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogsRouting {

}

// path: ":symbol",