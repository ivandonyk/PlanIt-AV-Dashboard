import { Component, OnInit } from '@angular/core';
import { ProjectPlanningService } from '../../_services/project-planning.service';
import { GlobalVarsHelper } from '../../_helpers/global-vars';
import { ProjectPlanList, ProjectPlan, ProjPlanDetailObj } from '../../_models/project-plannings.model';

@Component({
  selector: 'app-project-planning',
  templateUrl: 'project-planning.component.html',
  styleUrls: ['./project-planning.component.scss']
})
export class ProjectPlanningComponent {
   public single: Array<{name: string, value: number}> = [];
   public ProjPlanSum: ProjectPlan[];
   public view: Array<number> = [400, 300];
   public showXAxis = true;
   public showYAxis = true;
   public gradient = false;
   public roundEdges = false;
   public showLegend = false;
   public showXAxisLabel = true;
   public showYAxisLabel = true;
   public colorScheme = {
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
        this.ProjPlanSum = data.projectPlanList;
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
  getProjPlanDetail(id) {
    this.globalVars.spinner = true;

    this.projectPlanningServ.getProjPlanDetail(id)
      .subscribe((data: ProjPlanDetailObj) => {
        console.log(data);
        this.globalVars.spinner = false;
      }, error => {
        console.log(error);
        this.globalVars.spinner = false;

      });

  }


}


