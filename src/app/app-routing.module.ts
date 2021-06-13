import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { Layout2FlexComponent } from './layout/layout-2-flex/layout-2-flex.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MakeOrderComponent } from './pages/order/make-order/make-order.component';
import { AnalysisListComponent } from './pages/analysis/analysis-list/analysis-list.component';
import { OrdersListComponent } from './pages/order/orders-list/orders-list.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { ProfileDetailPageComponent } from './pages/profile/profile-detail-page/profile-detail-page.component';
import { ProfileEditPageComponent } from './pages/profile/profile-edit-page/profile-edit-page.component';
import { ProfileChangePasswordPageComponent } from './pages/profile/profile-change-password-page/profile-change-password-page.component';
import { ProfileChangeTransactionCodePageComponent } from './pages/profile/profile-change-transaction-code-page/profile-change-transaction-code-page.component';
import { MakeDepositPageComponent } from './pages/fund/make-deposit-page/make-deposit-page.component';
import { RequireAuthenticationGuardService } from './services/guards/auth/require-authentication-guard.service';
import { RequireNoAuthenticationGuardService } from './services/guards/auth/require-no-authentication-guard.service';
import { DepositReportPageComponent } from './pages/fund/deposit-report-page/deposit-report-page.component';
import { MakeWithdrawRequestPageComponent } from './pages/withdraw/make-withdraw-request-page/make-withdraw-request-page.component';
import { InvestmentProfitWithdrawalComponent } from './pages/fund/investment-profit-withdrawal/investment-profit-withdrawal.component';
import { InvestmentProfitMergeComponent } from './pages/fund/investment-profit-merge/investment-profit-merge.component';

// *******************************************************************************
// Routes

const routes: Routes = [


    { path: '', component: HomePageComponent, pathMatch: 'full'},
    { path: 'auth/login', component: LoginPageComponent, canActivate:[RequireNoAuthenticationGuardService], pathMatch: 'full'},
    { path: 'auth/register', component: RegisterPageComponent, canActivate:[RequireNoAuthenticationGuardService], pathMatch: 'full'},
    

    { path: 'member', component: Layout2Component, canActivate:[RequireAuthenticationGuardService], children: [ // 
        { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
        /*{ path: 'order', children: [
            { path: 'analysis', component:  AnalysisListComponent , pathMatch: 'full' },
            { path: 'new/:market', component:  MakeOrderComponent , pathMatch: 'full' },
            { path: 'list', component:  OrdersListComponent , pathMatch: 'full' },
        ]},*/
        { path: 'profile', children: [
            { path: 'detail', component:  ProfileDetailPageComponent , pathMatch: 'full' },
            { path: 'edit', component:  ProfileEditPageComponent , pathMatch: 'full' },
            { path: 'change-password', component:  ProfileChangePasswordPageComponent , pathMatch: 'full' },
            { path: 'transaction-code', component:  ProfileChangeTransactionCodePageComponent , pathMatch: 'full' },
        ] },
        { path: 'fund', children: [ 
            { path: 'deposit', component:  MakeDepositPageComponent , pathMatch: 'full' },
            { path: 'deposit-report', component:  DepositReportPageComponent , pathMatch: 'full' }, 
            { path: 'withdraw', component:  MakeWithdrawRequestPageComponent , pathMatch: 'full' },
            { path: 'investment-profit', children: [ 
                { path:'withdrawal', component: InvestmentProfitWithdrawalComponent, pathMatch: 'full'},
                { path:'merge', component: InvestmentProfitMergeComponent, pathMatch: 'full'}
            ]},
        ] },
    ]},

    { path: 'page-2', component: Layout2Component, children: [
        { path: '', component: DashboardComponent, pathMatch: 'full' },
    ]},

    // 404 Not Found page
    { path: '**', component: NotFoundComponent }

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
