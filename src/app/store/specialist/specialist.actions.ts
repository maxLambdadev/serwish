
import { PageData, Service, Specialist, SpecialistFilterArgs } from '@models/index';
import { createAction, props } from '@ngrx/store';



/**
 * Fetch Specialists
 */
export const fetchSpecialists = createAction(
    '[Specialist] Fetch Specialists',
    props<{ specialistFilterArgs?: SpecialistFilterArgs, pageId?: number }>()
)

export const fetchSpecialistsSuccess = createAction(
    '[Specialist] Fetch Specialists Success',
    props<{ specialists: Array<Specialist> }>()
)

export const fetchSpecialistsFailure = createAction(
    '[Specialist] Fetch Specialists Failure',
    props<{ err: any }>()
)

export const fetchSpecialistsPageDataSuccess = createAction(
    '[Specialist] Fetch Specialists Page Data Success',
    props<{ specialistsPageData: PageData }>()
)

export const clearSpecialists = createAction(
    '[Specialist] Clear Specialists'
)


/**
 * Fetch Single Specialist
 */
export const fetchSpecialist = createAction(
    '[Specialist] Fetch Specialist',
    props<{ id: number }>()
)

export const fetchSpecialistSuccess = createAction(
    '[Specialist] Fetch Specialist Success',
    props<{ specialist: Specialist }>()
)

export const fetchSpecialistFailure = createAction(
    '[Specialist] Fetch Specialist Failure',
    props<{ err: any }>()
)


/**
 * Fetch Specialist Services
 */
export const fetchSpecialistServices = createAction(
    '[Specialist] Fetch Specialist Services',
    props<{ id: number, args: SpecialistFilterArgs }>()
)

export const fetchSpecialistServicesSuccess = createAction(
    '[Specialist] Fetch Specialist Services Success',
    props<{ services: Array<Service> }>()
)

export const fetchSpecialistServicesFailure = createAction(
    '[Specialist] Fetch Specialist Services Failure',
    props<{ err: any }>()
)


export const fetchSpecialistsServicesPageDataSuccess = createAction(
    '[Specialist] Fetch Specialist Services Page Data Success',
    props<{ specialistServicesPageData: PageData }>()
)


export const clearSpecialistServices = createAction(
    '[Specialist] Clear Specialist Services'
)
