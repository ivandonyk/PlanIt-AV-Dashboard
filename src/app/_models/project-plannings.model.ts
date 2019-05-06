export interface ProjectPlan {
  year: string;
  projects: string;
  amount: number;
}


export interface ProjectPlanList {
  projectPlanList: ProjectPlan[];
}


export interface ProjPlanDetail {
  building: string;
  room: string;
  type: string;
  tier: number;
  coreAge: string;
  equipmentAge: string;
  projectedCost: number;
}

export interface ProjPlanDetailObj {
  projectPlanDetailList: ProjPlanDetail[];
}



