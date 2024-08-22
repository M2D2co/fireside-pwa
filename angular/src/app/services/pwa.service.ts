import { Platform } from '@angular/cdk/platform';
import { ApplicationRef, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { timer } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { InstallPromptComponent } from '../core/install-prompt/install-prompt.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(
    private platform: Platform,
    private bottomSheet: MatBottomSheet,
    private appRef: ApplicationRef,
    swUpdate: SwUpdate,
  ) {
    //  checks for new version
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        alert('A new version is available, app will reload to update to the latest version.')
        document.location.reload()
      })
  }

  public initPwaPrompt(): void {
    window.addEventListener('beforeinstallprompt', event => {
      //  TODO
      if (this.platform.ANDROID || this.platform.BLINK) {
        event.preventDefault()
        this.openPromptComponent('android', event);
      } else if (this.platform.IOS) {
        const isInStandaloneMode = ('standalone' in window.navigator) && ((window.navigator as any)['standalone']);
        if (!isInStandaloneMode) { this.openPromptComponent('ios', event); }
      }
    })
  }

  private openPromptComponent(mobileType: 'ios' | 'android', event: Event): void {
    this.appRef.isStable.pipe(first(isStable => isStable === true)).subscribe(() => {
      this.bottomSheet.open(InstallPromptComponent, { data: { mobileType, promptEvent: event } });
    })
  }

}
