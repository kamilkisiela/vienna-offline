import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent {
  @Input() title: string;
  @Input() text: string;
}
