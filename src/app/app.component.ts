import { Component } from '@angular/core';

import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private networkService: NetworkService) {}

  onNetworkStatus(online: boolean): void {
    if (online) {
      this.networkService.online().subscribe();
    } else {
      this.networkService.offline().subscribe();
    }
  }
}
