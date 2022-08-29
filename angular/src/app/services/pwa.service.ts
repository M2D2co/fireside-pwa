import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InstallPromptComponent } from '../core/install-prompt/install-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(
    private platform: Platform,
    private bottomSheet: MatBottomSheet,
  ) { }

  public initPwaPrompt(): void {
    window.addEventListener('beforeinstallprompt', event => {
      //  TODO
      // if (this.platform.ANDROID) {
      //   event.preventDefault()
      //   this.openPromptComponent('android', event);
      // } else if (this.platform.IOS) {
      //   const isInStandaloneMode = ('standalone' in window.navigator) && ((window.navigator as any)['standalone']);
      //   if (!isInStandaloneMode) {
      //     this.openPromptComponent('ios', event);
      //   }
      // }
    })
  }

  private openPromptComponent(mobileType: 'ios' | 'android', event: Event) {
    this.bottomSheet.open(InstallPromptComponent, { data: { mobileType, promptEvent: event } });
  }

}
