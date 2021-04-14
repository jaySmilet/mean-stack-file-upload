import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  preview: string;
  myReactiveform: FormGroup;
  percentDone: any = 0;
  users = [];

  constructor(public fb: FormBuilder, public router: Router, public fileUploadService: FileUploadService) {

    this.myReactiveform = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  ngOnInit(): void {
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myReactiveform.patchValue({
      avatar: file
    });
    this.myReactiveform.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.createUser(
      this.myReactiveform.value.name,
      this.myReactiveform.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['file-upload/users-list'])
      }
    })
  }

}
