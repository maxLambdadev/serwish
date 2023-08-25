
import { createAction, props } from '@ngrx/store';
import { BlogFilterArgs, Blog } from '@models/index';


/**
 * Fetch Blogs
 */
export const fetchBlogs = createAction(
    '[Blogs] Fetch Blogs',
    props<{ blogFilterArgs?: BlogFilterArgs }>()
)


export const fetchBlogsSuccess = createAction(
    '[Blogs] Fetch Blogs Success',
    props<{ blogs: Array<Blog> }>()
)

export const fetchBlogsFailure = createAction(
    '[Blogs] Fetch Blogs Failure',
    props<{ err: any }>()
)

/**
 * Fetch Single Blog
 */
export const fetchBlog = createAction(
    '[Blogs] Fetch Blog',
    props<{ blogDetailsParams: { locale: string, id: number } }>()
)

export const fetchBlogSuccess = createAction(
    '[Blogs] Fetch Blog Success',
    props<{ blog: Blog }>()
)

export const fetchBlogFailure = createAction(
    '[Blogs] Fetch Blog Failure',
    props<{ err: any }>()
)