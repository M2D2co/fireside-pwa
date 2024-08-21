import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startYear = 2019;
  currentYear = new Date().getFullYear();
  user = this.auth.authState;

  constructor(
    private auth: AngularFireAuth,
    private fcm: AngularFireMessaging,
    private snackBar: MatSnackBar,
  ) {
    // TODO: FCM - display in-app notifications
    this.fcm.messages.subscribe(message => {
      const notificationText = message?.notification?.body;
      if (notificationText) {
        this.snackBar.open(notificationText, 'dismiss', {
          panelClass: 'snackbar-success',
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
      }
    })
  }
}
