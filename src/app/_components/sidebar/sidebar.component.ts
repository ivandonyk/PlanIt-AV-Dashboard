import { Component, OnInit } from '@angular/core';
import { SidebarRoutesModule} from './sidebar-routes.module';
import { GlobalVarsHelper } from '../../_helpers/global-vars';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    public globalVars: GlobalVarsHelper
  ) { }

  ngOnInit() {
    console.log(this);
  }

}
