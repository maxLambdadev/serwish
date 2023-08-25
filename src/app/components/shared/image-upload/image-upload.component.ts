import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { ImageService } from "@services/imageUpload.service";
import { fetchUser } from "@store/user/user.actions";

class ImageSnippet {
  status: string = "init";
  mediaId: number = -1;

  constructor(public src: string, public file: File) {}
}

export enum UploadDestination {
  SERVICE = "service",
  SPECIALIST = "specialist",
}

@Component({
  selector: "sw-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  selectedFile: ImageSnippet;
  imageLoading: boolean = false;

  @Output() successUpload: EventEmitter<any> = new EventEmitter<any>();
  @Output() successRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {}

  private onSuccess(res: any): void {
    this.selectedFile.status = "ok";
    this.selectedFile.mediaId = res;
    this.successUpload.emit();

    this.cdr.detectChanges();
  }

  private onError(err: any): void {
    this.selectedFile.status = "fail";
    this.selectedFile.src = "";
    console.log("onError method in image-upload", err);
  }

  private onRemoveSuccess(): void {
    this.successRemove.emit();
    this.cdr.detectChanges();
  }

  @Input() userId: number = 0;
  @Input() serviceId: number = 0;
  @Input() uploadDestination: UploadDestination;

  @Input() alreadyHasImage: boolean;

  UPLOAD_DESTINATION = UploadDestination;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];

    const fileSize = imageInput.files[0].size / 1024 / 1024; // in MiB

    //Make normal error message
    if (fileSize > 5) {
      alert("File size exceeds 5mb! ფაელის ზომა აღემატება 5 მეგაბაიტს!");
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageLoading = true;
      this.cdr.markForCheck();

      let randomHash: number = this.randomHashNumber();

      this.imageService.startUploading(randomHash);

      if (this.uploadDestination === UploadDestination.SERVICE) {
        this.imageService
          .uploadServiceImage(this.selectedFile.file, this.serviceId)
          .subscribe(
            (res: any) => {
              this.imageLoading = false;
              this.imageService.finishedUploading(randomHash);
              this.onSuccess(res.body.id);
            },
            (err: any) => {
              this.imageLoading = false;
              this.imageService.finishedUploading(randomHash);
              this.onError(err);
            },
          );
      }

      if (this.uploadDestination === UploadDestination.SPECIALIST) {
        this.imageService
          .uploadSpecialistImage(this.selectedFile.file, this.userId)
          .subscribe(
            (res: any) => {
              this.imageLoading = false;
              this.onSuccess(res.body.id);

              //Fetch user to update image
              this.store.dispatch(fetchUser());
              this.selectedFile = null;
              this.cdr.markForCheck();
            },
            (err: any) => {
              this.imageLoading = false;
              this.onError(err);
            },
          );
      }
    });

    reader.readAsDataURL(file);
  }

  removeImage(mediaId: number) {
    this.imageService.startDeleting(mediaId);
    this.selectedFile = null;
    this.imageService.removeImages(mediaId, this.serviceId).subscribe(
      () => {
        this.imageService.finishedDeleting(mediaId);
        this.onRemoveSuccess();
      },
      (err: any) => {
        this.imageService.finishedDeleting(mediaId);
        console.log("Error in removeImage method in image-upload", err);
      },
    );
  }

  randomHashNumber(): number {
    // min and max included
    return Math.floor(Math.random() * (100000 - 100 + 1) + 100);
  }
}
