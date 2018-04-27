import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  online = navigator.onLine;
  @Output() networkStatus = new EventEmitter<boolean>();

  ngOnInit() {
    this.networkStatus.emit(this.online);
  }

  toggleNetworkStatus() {
    this.online = !this.online;

    this.networkStatus.emit(this.online);
  }
}
