// Libraries
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Utils
import CONSTANTS from '../../../../server/constants';

@Injectable({
  providedIn: 'root' // Makes the service a singleton available throughout the application
})
export class SnackbarService {
  baseUrl = CONSTANTS.API_ROUTES.ADMIN.ROUTE;
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  
  openSnackbar(msg: string): void {
    this._snackBar.open(msg, 'Dismiss');
  }
}