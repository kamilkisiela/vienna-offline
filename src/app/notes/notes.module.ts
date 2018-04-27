import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { NotesService } from './notes.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    NoteFormComponent,
    NoteItemComponent,
    NoteListComponent,
    NotesPageComponent,
  ],
  providers: [NotesService],
  exports: [NotesPageComponent],
})
export class NotesModule {}
