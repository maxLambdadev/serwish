
import { createAction, props } from '@ngrx/store';

import { ServiceFilterArgs, Service, Specialist, SpecialistFilterArgs, ExtPageData } from '@models/index';

/**
 * Fetch Services
 */

export const fetchServicesPolling = createAction(
    '[Service] Fetch Services'
)

export const fetchServices = createAction(
    '[Service] Fetch Services',
    props<{ serviceFilterArgs?: ServiceFilterArgs, pageId?: number }>()
)

export const fetchServicesSuccess = createAction(
    '[Service] Fetch Services Success',
    props<{ services: Array<Service> }>()
)

export const fetchServicesFailure = createAction(
    '[Service] Fetch Services Failure',
    props<{ err: any }>()
)

export const servicesClear = createAction(
    '[Service] Services Clear'
)

export const fetchServicesPageData = createAction(
    '[Service] Fetch Services Page Data',
    props<{ servicesPage?: ExtPageData }>()
)


/**
 * Fetch Single Service
 */
export const fetchService = createAction(
    '[Service] Fetch Service',
    props<{ id: number, locale: string }>()
)

export const fetchServiceSuccess = createAction(
    '[Service] Fetch Service Success',
    props<{ service: Service }>()
)

export const fetchServiceFailure = createAction(
    '[Service] Fetch Service Failure',
    props<{ err: any }>()
)


/**
 * Fetch Viewed Services
 */
export const fetchViewedServices = createAction(
    '[Service] Fetch Viewed Services',
    props<{ serviceFilterArgs?: ServiceFilterArgs }>()
)

export const fetchViewedServicesSuccess = createAction(
    '[Service] Fetch Viewed Services Success',
    props<{ viewedServices: Array<Service> }>()
)

export const fetchViewedServicesFailure = createAction(
    '[Service] Fetch Viewed Services Failure',
    props<{ err: any }>()
)



/**
 * Fetch Wishlist Services
 */
export const fetchWishlistServices = createAction(
    '[Service] Fetch Wishlist Services',
    props<{ wishlistFilterArgs?: ServiceFilterArgs }>()
)

export const updateWishlistServices = createAction(
    '[Service] Update Wishlist Services'
)

export const fetchWishlistServicesSuccess = createAction(
    '[Service] Fetch Wishlist Services Success',
    props<{ services: Array<Service> }>()
)

export const fetchWishlistServicesFailure = createAction(
    '[Service] Fetch Wishlist Services Failure',
    props<{ err: any }>()
)

/**
 * Fetch Similar Services
 */
export const fetchSimilarServices = createAction(
    '[Service] Fetch Similar Services ',
    props<{ serviceFilterArgs?: ServiceFilterArgs }>()
)

export const fetchSimilarServicesSuccess = createAction(
    '[Service] Fetch Similar Services Success',
    props<{ similarServices: Array<Service> }>()
)

export const fetchSimilarServicesFailure = createAction(
    '[Service] Fetch Similar Services Failure',
    props<{ err: any }>()
)


/**
 * Fetch Similar Specialists
 */
export const fetchSimilarSpecialists = createAction(
    '[Specialist] Fetch Similar Specialist ',
    props<{ specialistFilterArgs?: SpecialistFilterArgs }>()
)

export const fetchSimilarSpecialistsSuccess = createAction(
    '[Specialist] Fetch Similar Specialist Success',
    props<{ specialists: Array<Specialist> }>()
)

export const fetchSimilarSpecialistsFailure = createAction(
    '[Specialist] Fetch Similar Specialist Failure',
    props<{ err: any }>()
)

/**
 * Fetch My Services
 */
export const fetchMyServices = createAction(
    '[Services] Fetch My Services'
)

export const fetchMyServicesSuccess = createAction(
    '[Services] Fetch My Services Success',
    props<{ myServices: Array<Service> }>()
)

export const fetchMyServicesFailure = createAction(
    '[Services] Fetch My Services Failure',
    props<{ err: any }>()
)