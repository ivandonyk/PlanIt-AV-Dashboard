import { Component, OnInit } from '@angular/core';
import { ProjectPlanningService } from '../../_services/project-planning.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { ProjectPlanList, ProjectPlan } from '../../_models/project-plannings.model';

@Component({
  selector: 'app-project-planning',
  templateUrl: 'project-planning.component.html',
  styleUrls: ['./project-planning.component.css']
})
export class ProjectPlanningComponent {
  single: Array<{name: string, value: number}> = [];

  view: Array<number> = [400, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  roundEdges = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#fa0006']
  };

  constructor(
    private projectPlanningServ: ProjectPlanningService,
    public globalVars: GlobalVarsHelper,

  ) {
    this.globalVars.spinner = true;
    this.getProjPlanSum();
  }

  onSelect(event) {
    console.log(event);
  }
  getProjPlanSum() {
    this.projectPlanningServ.getProjPlanSum()
      .subscribe((data: ProjectPlanList) => {
        console.log(data);

        data.projectPlanList.forEach((item) => {
          this.single.push({
            name: item.year,
            value: item.amount
          });
          Object.assign(this, this.single);

        });

        this.globalVars.spinner = false;


      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });

  }


}


