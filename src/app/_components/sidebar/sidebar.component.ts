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
      }
    });

  }

  ngOnInit() {
    console.log(this);
  }

}
