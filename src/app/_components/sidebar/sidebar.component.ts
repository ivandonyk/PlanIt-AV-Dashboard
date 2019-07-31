import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarRoutesModule} from './sidebar-routes.module';
import {MediaMatcher} from '@angular/cdk/layout';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { Router, NavigationEnd } from '@angular/router';
import {AuthenticationService} from "../../_services/authentication.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentRoute: string;
  public IsMenuOpen: boolean;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public globalVars: GlobalVarsHelper,
    public router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public authServ: AuthenticationService,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        this.sessionGet('expire');
        //this.updateSession('expire');
      }
    });


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  sessionGet(key) {
    const stringValue = window.sessionStorage.getItem(key);
    if (stringValue !== null) {
      const value = stringValue;
      const expirationDate = new Date(value);
      if (expirationDate > new Date()) {
        return value;
      } else {
        this.authServ.logout();

      }
    }
    return null;
  }

  updateSession(key) {
    const token = window.sessionStorage.getItem('token');

    if (token != null) {
      const expires_in = window.sessionStorage.getItem('expires_in');

      const expirationDate = new Date(new Date().getTime() + (Number(expires_in) * 1000));
      const duration = expirationDate.toISOString();
      window.sessionStorage.setItem('expire', duration);
    } else {
      this.authServ.logout();
    }
  }


  ngOnInit() {
    console.log(this);
  }

}
