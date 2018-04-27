import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { appState } from './app.state';

import { MaterialModule } from './material/material.module';
import { ApiModule, State } from './api/api.module';
import { NotesModule } from './notes/notes.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MaterialModule,
    ApiModule,
    NotesModule,
  ],
  providers: [
    {
      provide: State,
      useValue: appState,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
