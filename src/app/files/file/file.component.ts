import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FileDto,
  FileService,
  TagDto,
  TagService,
} from '../../../../generated-sources/openapi';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit, OnDestroy {
  fileId!: number;
  file$: Observable<FileDto> | undefined;
  file!: FileDto;
  thumbnail: any;
  tags$: Observable<Array<TagDto>> | undefined;

  fileSubscription: Subscription | undefined;
  thumbnailSubscription: Subscription | undefined;
  tagsSubscription: Subscription | undefined;

  form!: FormGroup;
  fileForm!: FormGroup;
  tagForm!: FormGroup;

  get title() {
    return this.fileForm.get('title')!;
  }

  get notes() {
    return this.fileForm.get('notes')!;
  }

  get tags() {
    return this.tagForm.get('tags');
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      notes: [''],
    });

    this.tagForm = this.formBuilder.group({
      tags: [''],
    });

    this.form = new FormGroup({
      fileForm: this.fileForm,
      tagForm: this.tagForm,
    });

    this.route.params.subscribe((params) => {
      this.fileId = parseInt(params['id']);
      this.file$ = this.fileService.getFile(this.fileId);

      this.fileSubscription = this.file$.subscribe((f: FileDto) => {
        this.file = f;
        this.fileForm.patchValue({
          title: f.title,
          notes: f.notes,
        });
      });

      this.thumbnailSubscription = this.fileService
        .getThumbnail(this.fileId)
        .subscribe((t: Blob) => this.createImageFromBlob(t));

      this.tags$ = this.tagService.getTags();

      this.tagsSubscription = this.fileService
        .getTagsForFile(this.fileId)
        .subscribe((tags: Array<TagDto>) => {
          this.tagForm.patchValue({
            tags: tags,
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.fileSubscription?.unsubscribe();
    this.thumbnailSubscription?.unsubscribe();
    this.tagsSubscription?.unsubscribe();
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.thumbnail = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onSubmit(): void {
    if (this.fileForm.valid && this.fileForm.touched && this.fileForm.dirty) {
      this.file.title = this.fileForm.get('title')?.value;
      this.file.notes = this.fileForm.get('notes')?.value;
      this.fileService
        .changeFile(this.fileId, this.file)
        .subscribe((response) => {});
    }

    if (this.tagForm.valid && this.tagForm.touched && this.tagForm.dirty) {
      (this.tagForm.get('tags')?.value as Array<TagDto>).forEach(
        (tag: TagDto) => {
          console.warn(tag);
          this.fileService
            .addTagForFile(this.fileId, tag)
            .subscribe((response) => {});
        }
      );
    }
  }

  addTag(title: any): TagDto {
    return { title: title } as TagDto;
  }

  onRemoveTag(event: any): void {
    console.log(event);
  }
}
