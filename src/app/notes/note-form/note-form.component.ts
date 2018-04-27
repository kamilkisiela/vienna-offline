import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import gql from 'graphql-tag';

import { NoteInput } from '../models/note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnChanges {
  title = '';
  text = '';
  @Output() add = new EventEmitter<NoteInput>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: '',
      text: '',
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  onSubmit() {
    this.add.emit(this.form.value);
  }

  private rebuildForm() {
    this.form.reset({
      title: this.title,
      text: this.text,
    });
  }
}
