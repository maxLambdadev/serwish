import { Blog, Slider, Specialist } from '@models/index';
import { createAction, props } from '@ngrx/store';

/**
 * Fetch Slider
 */
export const fetchSlider = createAction(
    '[Slider] Fetch Slider',
    props<{ locale: string }>()
)

export const fetchSliderSuccess = createAction(
    '[Slider] Fetch Slider Success',
    props<{ slider: Array<Slider> }>()
)

export const fetchSliderFailure = createAction(
    '[Slider] Fetch Slider Failure',
    props<{ err: any }>()
)

/**
 * Fetch Home Blogs
 */
export const fetchHomeBlogs = createAction(
    '[Blogs] Fetch Home Blogs',
    props<{ filterType?: string }>()
)

export const fetchHomeBlogsSuccess = createAction(
    '[Blogs] Fetch Home Blogs Success',
    props<{ blogs: Blog[] }>()
)

export const fetchHomeBlogsFailure = createAction(
    '[Blogs] Fetch Home Blogs Failure',
    props<{ err: any }>()
)


/**
 * Fetch Home Specialists
 */
export const fetchHomeSpecialists = createAction(
    '[Specialist] Fetch Home Specialists',
    props<{ filterType?: string }>()
)

export const fetchHomeSpecialistsSuccess = createAction(
    '[Specialist] Fetch Home Specialists Success',
    props<{ specialists: Array<Specialist> }>()
)

export const fetchHomeSpecialistsFailure = createAction(
    '[Specialist] Fetch Home Specialists Failure',
    props<{ err: any }>()
)
