import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDto, FileService } from '../../../../generated-sources/openapi';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  files$: Observable<Array<FileDto>> | undefined;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.files$ = this.fileService.getFiles();
  }
}
