import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarRoutesModule} from './sidebar-routes.module';
import {MediaMatcher} from '@angular/cdk/layout';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { Router, NavigationEnd } from '@angular/router';
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
    public media: MediaMatcher
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        this.sessionGet('expire');
      }
    });


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  sessionGet(key) {
    const stringValue = window.sessionStorage.getItem(key)
    if (stringValue !== null) {
      const value = stringValue;
      const expirationDate = new Date(value);
      if (expirationDate > new Date()) {
        return value;
      } else {
        window.sessionStorage.removeItem(key);
        window.sessionStorage.removeItem('currentUser');
        window.location.href = window.location.origin + '/login';

      }
    }
    return null;
  }


  ngOnInit() {
    console.log(this);
  }

}
