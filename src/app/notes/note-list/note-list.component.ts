import { Component, Input } from '@angular/core';

import { Note } from '../models/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  @Input() notes: Note[];
}
