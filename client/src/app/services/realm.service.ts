import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Endpoints} from './endpoints';
import {SharedService} from './shared.service';
import {Realm} from '../models/realm';
import {AuctionsService} from './auctions.service';
import {User} from '../models/user/user';
import {ErrorReport} from '../utils/error-report.util';
import {Angulartics2} from 'angulartics2';
import {MatSnackBar} from '@angular/material';
import {ObjectUtil} from '../utils/object.util';
import {Report} from '../utils/report.util';

@Injectable()
export class RealmService {

  constructor(private _http: HttpClient,
              private angulartics2: Angulartics2,
              private matSnackBar: MatSnackBar) {
  }

  public static async changeRealm(auctionService: AuctionsService, realm: string, region?: string) {
    if (region) {
      SharedService.user.region = region;
    }
    SharedService.user.realm = realm;
    User.save();

    if (SharedService.user.apiToUse === 'tsm') {
      await auctionService.getTsmAuctions();
    } else if (SharedService.user.apiToUse === 'wowuction') {
      await auctionService.getWoWUctionAuctions();
    }
    await auctionService.getLastModifiedTime(true);
  }

  getRealms(region?: string, isRetry?: boolean): Promise<any> {
    let url = '';

    if (isRetry) {
      url = `/assets/data/${
        Endpoints.getRegion(region)
        }-realms.json`;
      return this._http.post(Endpoints.getLambdaUrl(
        `realm`), {
        locale: localStorage['locale'],
        region: region
      })
        .toPromise()
        .then(r => this.handleRealms(r));
    } else {
      if (!region) {
        return new Promise<any>((resolve, reject) => {
          resolve();
        });
      }

      return this._http.post(Endpoints.getLambdaUrl(
        `realm`), {
        locale: localStorage['locale'],
        region: region
      })
        .toPromise()
        .then(r => this.handleRealms(r))
        .catch((error: HttpErrorResponse) => {
          const msg = 'Could not download realms';
          console.error(msg, error);
          ErrorReport.sendHttpError(error);
          this.openSnackbar(`${msg}. Blizzard's API responded with: ${error.status} - ${error.statusText}`);

          // In case Blizzard's API fails, use old data json
          this.getRealms(region, true);
        });
    }
  }

  private openSnackbar(message: string): void {
    this.matSnackBar.open(message, 'Ok', {duration: 3000});
  }

  private handleRealms(r: Object) {
    if (ObjectUtil.isAPopulatedObject(r) && ObjectUtil.isArray(r['realms'])) {
      Object.keys(SharedService.realms).forEach(key => {
        delete SharedService.realms[key];
      });
      r['realms'].forEach((realm: Realm) => {
        SharedService.realms[realm.slug] = realm;
      });
      Realm.gatherRealms();
    } else {
      ErrorReport.sendError('handleRealms', {
        name: 'The app could not fetch the realm data correctly', message: 'No object were found', stack: undefined
      });
    }
  }
}
