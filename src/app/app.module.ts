import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from '../../generated-sources/openapi';
import { FilesComponent } from './files/files/files.component';
import { FileComponent } from './files/file/file.component';
import { BytesPipe } from './pipes/bytes.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent, FilesComponent, FileComponent, BytesPipe],
  imports: [
    ApiModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [{ provide: BASE_PATH, useValue: 'http://localhost:4200/api' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
