import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import {
  selectCategories,
  selectCategoriesLoadingsStatus,
  selectUserPhoneNumber,
  selectUserName,
} from "@store/index";
import { Editor, Toolbar } from "ngx-editor";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { concat } from "rxjs/internal/observable/concat";
import { Subject } from "rxjs/internal/Subject";
import {
  catchError,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import { Device, PayLogic } from "@models/index";
import {
  AddServiceService,
  CitiesService,
  ImageService,
  TagsService,
} from "@services/index";

const { convert } = require("html-to-text");

export enum ServiceAddSteps {
  OVERALL_INFO,
  IMAGE_UPLOAD,
  AVAILABILITY,
  PAYMENTS,
  SUCCESS,
}

@Component({
  selector: "sw-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceComponent implements OnInit, OnDestroy {
  @HostBinding("class.sw-add-service") className: boolean = true;

  @HostBinding("class.sw-add-service--mobile") public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private serviceAddService: AddServiceService,
    private tagsService: TagsService,
    private citiesService: CitiesService,
    private imageService: ImageService,
  ) {
    this.serviceAddForm = new UntypedFormGroup({
      selectedCategory: new UntypedFormControl(null, [Validators.required]),
      title: new UntypedFormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(60),
        ],
      }),
      description: new UntypedFormControl("", { validators: [Validators.required] }),
      tags: new UntypedFormControl([], { validators: [Validators.required] }),
      workType: new UntypedFormControl("full"),
      workingDays: new UntypedFormControl({ value: false, disabled: true }),
      saturday: new UntypedFormControl({ value: false, disabled: true }),
      sunday: new UntypedFormControl({ value: false, disabled: true }),
      workingDaysValueStart: new UntypedFormControl({ value: "09:00", disabled: true }),
      workingDaysValueEnd: new UntypedFormControl({ value: "18:00", disabled: true }),
      saturdayValueStart: new UntypedFormControl({ value: "09:00", disabled: true }),
      saturdayValueEnd: new UntypedFormControl({ value: "18:00", disabled: true }),
      sundayValueStart: new UntypedFormControl({ value: "09:00", disabled: true }),
      sundayValueEnd: new UntypedFormControl({ value: "18:00", disabled: true }),
      cities: new UntypedFormControl(["1"], { validators: [Validators.required] }),
      phoneFromProfile: new UntypedFormControl({ value: true }),
      nameFromProfile: new UntypedFormControl({ value: true }),
      phoneOther: new UntypedFormControl({ value: "", disabled: true }),
      nameOther: new UntypedFormControl({ value: "", disabled: true }),
      showPrice: new UntypedFormControl(false),
      price: new UntypedFormControl(
        { value: "", disabled: true },
        { validators: [Validators.required] },
      ),
      payLogic: new UntypedFormControl({ value: PayLogic.HOUR, disabled: true }),
    });
  }

  @Input() device: Device;

  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  DEVICE = Device;

  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
  ];

  colorPresets = ["red", "#FF0000", "rgb(255, 0, 0)"];

  editor: Editor;

  SERVICE_ADD_STEPS = ServiceAddSteps;

  serviceAddForm: UntypedFormGroup;
  activeStep = ServiceAddSteps.OVERALL_INFO;

  payLogic: any[] = [];
  accNumbers: any[] = [];
  hours: any[] = [];

  defaultPayLogic = [
    {
      name: PayLogic.HOUR,
      label: "",
    },
    {
      name: PayLogic.DAY,
      label: "",
    },
    {
      name: PayLogic.WEEK,
      label: "",
    },
    {
      name: PayLogic.MONTH,
      label: "",
    },
    {
      name: PayLogic.END,
      label: "",
    },
  ];

  defaultAccNumbers = ["GE00TB0000000000000000", "GE00TB0000000000000011"];

  showFormErrors = {
    OVERALL_INFO: false,
    IMAGE_UPLOAD: false,
    AVAILABILITY: false,
    PAYMENTS: false,
  };

  defaultHours = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  showImageErrors: boolean = false;

  //Tags
  tags$: Observable<any[]>;
  tagsLoading = false;
  tagsInput$ = new Subject<string>();

  //Cities
  cities$: Observable<any[]>;
  citiesLoading = false;
  citiesInput$ = new Subject<string>();

  isLoading: boolean;

  //Categories
  categoriesLoading$: Observable<any> = this.store.select(selectCategoriesLoadingsStatus);
  categories$: Observable<any> = this.store.select(selectCategories);

  newId: number;
  userPhoneNumber$: Observable<any> = this.store.select(selectUserPhoneNumber);
  profilePhoneNumber: string;
  userName$: Observable<any> = this.store.select(selectUserName);
  profileName: string;
  private unsubscribe$: Subject<null> = new Subject();

  public descriptionLength = new BehaviorSubject(0);
  public titleLength = new BehaviorSubject(0);

  prevValue: string;

  isUploadingImage$: Observable<boolean> = this.imageService.isUploading$;
  isDeletingImages$: Observable<boolean> = this.imageService.isDeleting$;

  ngOnInit(): void {
    this.editor = new Editor({});

    this.serviceAddForm.controls["description"].valueChanges.subscribe((v) => {
      let text = convert(v, { wordwrap: 130 });

      if (text.length <= 380) {
        this.prevValue = v;
        this.descriptionLength.next(text.length);
      } else {
        this.serviceAddForm.controls["description"].setValue(this.prevValue);
      }
    });

    this.serviceAddForm.controls["title"].valueChanges.subscribe((v) => {
      let textLength = v.length;

      if (textLength < 61) {
        this.titleLength.next(textLength);
      }
    });

    this.defaultPayLogic.forEach((item, i) => {
      let label = this.translateService.instant("Global." + item.name.toUpperCase());

      this.payLogic.push({ id: i, name: item.name, label: label });
    });

    this.defaultAccNumbers.forEach((c, i) => {
      this.accNumbers.push({ id: i, name: c });
    });

    this.defaultHours.forEach((c, i) => {
      this.hours.push({ id: i, name: c });
    });

    this.serviceAddForm.controls["workType"].valueChanges.subscribe((val: string) => {
      if (val === "full") {
        this.serviceAddForm.controls["workingDays"].disable();
        this.serviceAddForm.controls["saturday"].disable();
        this.serviceAddForm.controls["sunday"].disable();
      } else {
        this.serviceAddForm.controls["workingDays"].enable();
        this.serviceAddForm.controls["saturday"].enable();
        this.serviceAddForm.controls["sunday"].enable();
      }
    });

    this.serviceAddForm.controls["phoneFromProfile"].valueChanges.subscribe(
      (val: boolean) => {
        if (val) {
          this.serviceAddForm.controls["phoneOther"].disable();
        } else {
          this.serviceAddForm.controls["phoneOther"].enable();
        }
      },
    );

    this.serviceAddForm.controls["nameFromProfile"].valueChanges.subscribe(
      (val: boolean) => {
        if (val) {
          this.serviceAddForm.controls["nameOther"].disable();
        } else {
          this.serviceAddForm.controls["nameOther"].enable();
        }
      },
    );

    this.serviceAddForm.controls["showPrice"].valueChanges.subscribe((val: boolean) => {
      if (val) {
        this.serviceAddForm.controls["price"].enable();
        this.serviceAddForm.controls["payLogic"].enable();
      } else {
        this.serviceAddForm.controls["price"].disable();
        this.serviceAddForm.controls["payLogic"].disable();
      }
    });

    this.serviceAddForm.controls["workingDays"].valueChanges.subscribe((val: boolean) => {
      if (val) {
        this.serviceAddForm.controls["workingDaysValueStart"].enable();
        this.serviceAddForm.controls["workingDaysValueEnd"].enable();
      } else {
        this.serviceAddForm.controls["workingDaysValueStart"].disable();
        this.serviceAddForm.controls["workingDaysValueEnd"].disable();
      }
    });

    this.serviceAddForm.controls["saturday"].valueChanges.subscribe((val: boolean) => {
      if (val) {
        this.serviceAddForm.controls["saturdayValueStart"].enable();
        this.serviceAddForm.controls["saturdayValueEnd"].enable();
      } else {
        this.serviceAddForm.controls["saturdayValueStart"].disable();
        this.serviceAddForm.controls["saturdayValueEnd"].disable();
      }
    });

    this.serviceAddForm.controls["sunday"].valueChanges.subscribe((val: boolean) => {
      if (val) {
        this.serviceAddForm.controls["sundayValueStart"].enable();
        this.serviceAddForm.controls["sundayValueEnd"].enable();
      } else {
        this.serviceAddForm.controls["sundayValueStart"].disable();
        this.serviceAddForm.controls["sundayValueEnd"].disable();
      }
    });

    this.userPhoneNumber$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((contactNumber: any) => {
        this.profilePhoneNumber = contactNumber;
      });
    this.userName$.pipe(takeUntil(this.unsubscribe$)).subscribe((serviceName: any) => {
      this.profileName = serviceName;
    });
  }

  nextStep() {
    this.showErrorsPerPage();

    let isTitleValid = this.serviceAddForm.controls["title"].valid;
    let isCategoryValid = this.serviceAddForm.controls["selectedCategory"].valid;
    let isDescriptionValid = this.serviceAddForm.controls["description"].valid;
    let isTagsValid = this.serviceAddForm.controls["tags"].valid;
    let isCityValid = this.serviceAddForm.controls["cities"].valid;
    let isPriceValid = this.serviceAddForm.controls["price"].valid;
    let isImgCountValid = this.imageCount > 0;

    // First Basic
    if (
      this.activeStep === ServiceAddSteps.OVERALL_INFO &&
      isTitleValid &&
      isCategoryValid &&
      isDescriptionValid
    ) {
      const data = {
        title: this.serviceAddForm.controls["title"].value,
        description: this.serviceAddForm.controls["description"].value,
        categories: this.serviceAddForm.controls["selectedCategory"].value,
        locale: this.translateService.currentLang,
        is_active: false,
      };

      this.isLoading = true;
      this.serviceAddService.createServiceBasic(data).subscribe(
        (res: any) => {
          this.activeStep++;
          this.newId = res.id;
          this.isLoading = false;
          this.loadTags();
          this.cdr.markForCheck();
        },
        () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      );
    }

    // Images and tags click
    if (this.activeStep === ServiceAddSteps.IMAGE_UPLOAD) {
      if (isTagsValid && isImgCountValid) {
        this.isLoading = true;

        let tagsArray = this.serviceAddForm.controls["tags"].value.map((tag: any) => {
          return tag.name;
        });

        const data = {
          locale: this.translateService.currentLang,
          tags: tagsArray,
          service_id: this.newId,
        };

        this.tagsService.syncTags(data).subscribe(
          () => {
            this.isLoading = false;
            this.activeStep++;
            this.loadCity();
            this.cdr.markForCheck();
          },
          () => {
            this.isLoading = false;
            this.cdr.markForCheck();
          },
        );
      } else {
        this.showImageErrors = true;
      }
    }

    //Availability
    if (this.activeStep === ServiceAddSteps.AVAILABILITY && isCityValid) {
      this.isLoading = true;

      let citiesArray = this.serviceAddForm.controls["cities"].value.map((city: any) => {
        return city.id;
      });

      let workType = this.serviceAddForm.controls["workType"].value;

      const citiesData = {
        locale: this.translateService.currentLang,
        cities: citiesArray,
        service_id: this.newId,
      };

      this.citiesService.syncCities(citiesData).subscribe(
        (_res: any) => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        (_err: any) => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      );

      let data: any = {
        locale: this.translateService.currentLang,
        id: this.newId,
        workType: workType,
      };

      if (workType === "custom") {
        if (this.serviceAddForm.controls["workingDays"].value) {
          data.workingDays = {
            start_at: this.serviceAddForm.controls["workingDaysValueStart"].value,
            end_at: this.serviceAddForm.controls["workingDaysValueEnd"].value,
          };
        }

        if (this.serviceAddForm.controls["saturday"].value) {
          data.saturday = {
            start_at: this.serviceAddForm.controls["saturdayValueStart"].value,
            end_at: this.serviceAddForm.controls["saturdayValueEnd"].value,
          };
        }

        if (this.serviceAddForm.controls["sunday"].value) {
          data.sunday = {
            start_at: this.serviceAddForm.controls["sundayValueStart"].value,
            end_at: this.serviceAddForm.controls["sundayValueEnd"].value,
          };
        }
      }

      this.serviceAddService.updateServiceBasic(data).subscribe(
        (_res: any) => {
          this.activeStep++;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      );
    }

    let showPrice = this.serviceAddForm.controls["showPrice"].value;

    //Payments
    if (this.activeStep === ServiceAddSteps.PAYMENTS && (isPriceValid || !showPrice)) {
      this.isLoading = true;

      let phoneFromProfile = this.serviceAddForm.controls["phoneFromProfile"].value;
      let nameFromProfile = this.serviceAddForm.controls["nameFromProfile"].value;
      let contactNumber: string;
      let serviceName: string;
      let price_type = this.serviceAddForm.controls["payLogic"].value;

      if (phoneFromProfile) {
        contactNumber = this.profilePhoneNumber;
      } else {
        contactNumber = this.serviceAddForm.controls["phoneOther"].value;
      }
      if (nameFromProfile) {
        serviceName = this.profileName;
      } else {
        serviceName = this.serviceAddForm.controls["nameOther"].value;
      }

      let data: any = {
        locale: this.translateService.currentLang,
        id: this.newId,
        contact_number: contactNumber,
        is_active: true,
        price_type: price_type,
        service_name: serviceName,
      };

      if (showPrice) {
        data.price = this.serviceAddForm.controls["price"].value;
      }

      this.isLoading = true;
      this.serviceAddService.updateServiceBasic(data).subscribe(
        (_res: any) => {
          this.isLoading = false;
          this.activeStep = ServiceAddSteps.SUCCESS;
          this.cdr.markForCheck();
        },
        () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      );
    }
  }

  prevStep() {
    this.activeStep--;
    this.showErrorsPerPage();
  }

  showErrorsPerPage() {
    if (this.activeStep === 0) {
      this.showFormErrors.OVERALL_INFO = true;
    } else if (this.activeStep === 1) {
      this.showFormErrors.IMAGE_UPLOAD = true;
    } else if (this.activeStep === 2) {
      this.showFormErrors.AVAILABILITY = true;
    } else if (this.activeStep === 3) {
      this.showFormErrors.PAYMENTS = true;
    }
  }

  loadTags() {
    this.tags$ = concat(
      of([]), // default items
      this.tagsInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.tagsLoading = true)),
        switchMap((term) =>
          this.tagsService.getTags(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.tagsLoading = false)),
          ),
        ),
      ),
    );
  }

  loadCity() {
    this.cities$ = concat(
      of([]), // default items
      this.citiesInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.citiesLoading = true)),
        switchMap((term) =>
          this.citiesService.getCities(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.citiesLoading = false)),
          ),
        ),
      ),
    );

    let defaultCity;

    defaultCity = [
      {
        created_at: null,
        id: 2,
        locale: "ka",
        name: "თბილისი",
        updated_at: null,
      },
    ];

    this.serviceAddForm.controls["cities"].setValue(defaultCity);
  }

  addTagFn(name: any) {
    return { name: name, tag: true };
  }

  imageCount: number = 0;

  countUpUpload() {
    this.imageCount++;
    this.showImageErrors = false;
    this.cdr.markForCheck();
  }
  countDownUpload() {
    this.imageCount--;
    if (this.imageCount === 0) {
      this.showImageErrors = true;
    }
    this.cdr.markForCheck();
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.translated.title.toLowerCase().indexOf(term) > -1 ||
      item.translated.slug.toLowerCase().indexOf(term) > -1
    );
  }

  onClosePopup() {
    this.closePopup.emit();
  }

  trackByFn(index: number, _item: any) {
    return index;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
