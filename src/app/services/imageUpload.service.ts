import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  private isUploadingSubj = new BehaviorSubject<boolean>(false);
  private isDeletingSubj = new BehaviorSubject<boolean>(false);

  isUploading$ = this.isUploadingSubj.asObservable();
  isDeleting$ = this.isDeletingSubj.asObservable();

  uploadingImages = new Map<number, boolean>();
  deletingImages = new Map<number, boolean>();

  constructor(private http: HttpClient) {}

  startUploading(mediaId: number): void {
    this.isUploadingSubj.next(true);
    this.uploadingImages.set(mediaId, true);
  }

  finishedUploading(mediaId: number): void {
    this.uploadingImages.delete(mediaId);
    if (this.uploadingImages.size === 0) {
      this.isUploadingSubj.next(false);
    }
  }

  startDeleting(mediaId: number): void {
    this.isDeletingSubj.next(true);
    this.deletingImages.set(mediaId, true);
  }

  finishedDeleting(mediaId: number): void {
    this.deletingImages.delete(mediaId);
    if (this.deletingImages.size === 0) {
      this.isDeletingSubj.next(false);
    }
  }

  public uploadServiceImage(file: File, serviceId: number): Observable<any> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("service_id", serviceId.toString());
    formData.append("is_main", "false");

    return this.http.post(`${environment.apiUrl}/api/services/add-images`, formData);
  }

  public uploadSpecialistImage(file: File, userId: number): Observable<any> {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("user_id", userId.toString());

    return this.http.post(`${environment.apiUrl}/api/user/add-profile-pic`, formData);
  }

  public removeImages(mediaId: number, serviceId: number): Observable<any> {
    let formData = new FormData();

    formData.append("media_id", mediaId.toString());
    formData.append("service_id", serviceId.toString());

    return this.http.post(`${environment.apiUrl}/api/services/remove-images`, formData);
  }
}
