import { Component, OnInit } from '@angular/core';
import { SidebarRoutesModule} from './sidebar-routes.module';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentRoute: string;

  constructor(
    public globalVars: GlobalVarsHelper,
    public router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        this.sessionGet('expire');
      }
    });

  }

  sessionGet(key) {
    const stringValue = window.sessionStorage.getItem(key)
    if (stringValue !== null) {
      const value = stringValue
      const expirationDate = new Date(value)
      if (expirationDate > new Date()) {
        return value;
      } else {
        window.sessionStorage.removeItem(key);
        window.sessionStorage.removeItem('currentUser');
        window.location.href = window.location.origin + '/login';

      }
    }
    return null
  }


  ngOnInit() {
    console.log(this);
  }

}
