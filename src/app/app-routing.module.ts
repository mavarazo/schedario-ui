import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files/files.component';
import { FileComponent } from './files/file/file.component';

const routes: Routes = [
  { path: 'files', component: FilesComponent },
  { path: 'files/:id', component: FileComponent },
  { path: '**', component: FilesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
