import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Note, NoteInput } from '../models/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent implements OnInit {
  notes$: Observable<Note[]>;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes$ = this.notesService.all();
  }

  addNote(note: NoteInput): void {
    this.notesService
      .add({
        title: note.title,
        text: note.text,
      })
      .subscribe();
  }
}
