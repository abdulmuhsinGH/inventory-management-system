import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from '../dashboard/dashboard.component';
import { FinancialReportComponent }  from '../financial-report/financial-report.component';






const routes: Routes = [
   	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: 'dashboard', component: DashboardComponent },
  { path: 'financial-report', component: FinancialReportComponent },
  
 ];
 
 @NgModule({
  imports: [
    RouterModule.forRoot(routes
    )
  ],
  exports: [
    RouterModule
  ]
})



export class AppRoutingModule {
}

export const routingComponents = [DashboardComponent, FinancialReportComponent];
