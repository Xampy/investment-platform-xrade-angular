import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// *******************************************************************************
// NgBootstrap

import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from '../vendor/libs/quill/quill.module';
import { SortablejsModule } from 'ngx-sortablejs';
import { TagInputModule } from 'ngx-chips';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2CompleterModule } from '@akveo/ng2-completer';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DragulaModule } from 'ng2-dragula';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgBootstrapDatetimeAngularModule } from "ng-bootstrap-datetime-angular";

import { ToastrModule } from 'ngx-toastr';

// *******************************************************************************
// libs
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ColorPickerModule } from 'ngx-color-picker';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FileUploadModule } from 'ng2-file-upload';
import { ArchwizardModule } from 'ng2-archwizard';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { TextMaskModule } from 'angular2-text-mask';
import { NgApexchartsModule } from "ng-apexcharts";
import {Ng2TelInputModule} from 'ng2-tel-input';



import { HoverDropdownModule } from '../vendor/libs/hover-dropdown/hover-dropdown.module';
import { MegaDropdownModule } from '../vendor/libs/mega-dropdown/mega-dropdown.module';
import { ContextMenuModule } from 'ngx-contextmenu';

import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';

// *******************************************************************************
// Ngx-SweetAlert2
export async function provideSwal() {
  return Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-lg btn-primary',
      cancelButton: 'btn btn-lg btn-default'
    }
  });
}

// *******************************************************************************
// NgBootstrap

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MakeOrderComponent } from './pages/order/make-order/make-order.component';
import { AnalysisListComponent } from './pages/analysis/analysis-list/analysis-list.component';
import { OrdersListComponent } from './pages/order/orders-list/orders-list.component';
import { StoreModule } from '@ngrx/store';
import { AnalysisDataReducer } from './store/analysis/reducers/analysis-data.reducer';
import { environment } from 'src/environments/environment';
import { MarketOrderReducer } from './store/order/reducers/order.reducer';
import { SignalReducer } from './store/signal/reducers/signal.reducer';
import { CanvasJsChartComponent } from './components/canvas-js-chart/canvas-js-chart.component';
import { SignalLastRowReducer } from './store/signal/reducers/signal-last-row.reducer';
import { MarketAnalysisDataApiService } from './services/api/xrade/market-analysis-data/market-analysis-data-api.service';
import { MarketOrderApiService } from './services/api/xrade/market-order/market-order-api.service';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './store/effects/order.effetcs';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { ProfileDetailPageComponent } from './pages/profile/profile-detail-page/profile-detail-page.component';
import { ProfileEditPageComponent } from './pages/profile/profile-edit-page/profile-edit-page.component';
import { ProfileChangePasswordPageComponent } from './pages/profile/profile-change-password-page/profile-change-password-page.component';
import { ProfileChangeTransactionCodePageComponent } from './pages/profile/profile-change-transaction-code-page/profile-change-transaction-code-page.component';
import { MakeDepositPageComponent } from './pages/fund/make-deposit-page/make-deposit-page.component';
import { StripePaymentService } from './services/payment/stripe/stripe-payment.service';
import { AuthApiService } from './services/api/xrade/auth/auth-api.service';
import { httpInterceptorProviders } from './services/interceptors';
import { InvitePageComponent } from './pages/team/invite-page/invite-page.component';
import { TeamMembersPageComponent } from './pages/team/team-members-page/team-members-page.component';
import { MakeDepositRequestPageComponent } from './pages/fund/make-deposit-request-page/make-deposit-request-page.component';
import { WithdrawReportPageComponent } from './pages/withdraw/withdraw-report-page/withdraw-report-page.component';
import { MakeWithdrawRequestPageComponent } from './pages/withdraw/make-withdraw-request-page/make-withdraw-request-page.component';
import { DepositReportPageComponent } from './pages/fund/deposit-report-page/deposit-report-page.component';
import { AccountDataManagerService } from './services/account/account-data-manager.service';
import { MemberDepositApiService } from './services/api/xrade/fund/deposit/member-deposit-api.service';
import { AppToastService } from './services/component/app-toast.service';
import { AppToastsComponent } from './components/app-toasts/app-toasts.component';
import { MemberWithdrawApiService } from './services/api/xrade/fund/withdraw/member-withdraw-api.service';
import { SecurityApiService } from './services/api/xrade/security/security-api.service';
import { MemberInterestPaymentApiService } from './services/api/xrade/fund/interest-payment/member-interest-payment-api.service';
import { AsyncMemberReferenceValidator } from './share/validators/async-reference.validator';
import { CardPaymentService } from './services/api/xrade/payment/card/card-payment.service';
import { InvestmentProfitWithdrawalComponent } from './pages/fund/investment-profit-withdrawal/investment-profit-withdrawal.component';
import { InvestmentProfitApiService } from './services/api/xrade/fund/interest-profit/investment-profit-api.service';
import { InvestmentProfitMergeComponent } from './pages/fund/investment-profit-merge/investment-profit-merge.component';
import { SponsorshipProfitWithdrawalComponent } from './pages/fund/sponsorship-profit-withdrawal/sponsorship-profit-withdrawal.component';
import { SponsorshipProfitMergeComponent } from './pages/fund/sponsorship-profit-merge/sponsorship-profit-merge.component';
import { SponsorshipProfitService } from './services/api/xrade/fund/sponsorship-profit/sponsorship-profit.service';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { CreditCardComponentComponent } from './components/credit-card-component/credit-card-component.component';
import { PerfectMoneyComponentComponent } from './components/perfect-money-component/perfect-money-component.component';
import { PerfectMoneyService } from './services/api/xrade/payment/perfect-money/perfect-money.service';
import { WithdrawalWidgetFormComponent } from './components/withdrawal-widget-form/withdrawal-widget-form.component';
import { APP_BASE_HREF } from '@angular/common';

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    // Pages
    HomeComponent,
    Page2Component,
    DashboardComponent,
    MakeOrderComponent,
    AnalysisListComponent,
    OrdersListComponent,
    CanvasJsChartComponent,
    AppToastsComponent ,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FooterComponent,
    ProfileDetailPageComponent,
    ProfileEditPageComponent,
    ProfileChangePasswordPageComponent,
    ProfileChangeTransactionCodePageComponent,
    MakeDepositPageComponent,
    InvitePageComponent,
    TeamMembersPageComponent,
    MakeDepositRequestPageComponent,
    WithdrawReportPageComponent,
    MakeWithdrawRequestPageComponent,
    DepositReportPageComponent,
    InvestmentProfitWithdrawalComponent,
    InvestmentProfitMergeComponent,
    SponsorshipProfitWithdrawalComponent,
    SponsorshipProfitMergeComponent,
    VerifyEmailComponent,
    CreditCardComponentComponent,
    PerfectMoneyComponentComponent,
    WithdrawalWidgetFormComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,

    EffectsModule.forRoot([OrderEffects]),  
    StoreModule.forRoot({
      analysisData: AnalysisDataReducer,
      marketOrderData: MarketOrderReducer,
      signalsData: SignalReducer,
      signalsLastData: SignalLastRowReducer
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

    NgApexchartsModule,

    // App
    AppRoutingModule,
    LayoutModule,
    NgxDatatableModule,
    Ng2CompleterModule,
    Ng2SmartTableModule,
    NgBootstrapDatetimeAngularModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxImageGalleryModule,
    NouisliderModule,
    NgSelectModule,
    QuillModule,
    SortablejsModule,
    TagInputModule,
    PerfectScrollbarModule,
    HoverDropdownModule,
    MegaDropdownModule,
    ContextMenuModule,
    MultiselectDropdownModule,
    ColorPickerModule,
    LMarkdownEditorModule,
    DropzoneModule,
    FileUploadModule,
    ArchwizardModule,
    TextareaAutosizeModule,
    TextMaskModule,
    Ng2ChartsModule,
    DragulaModule,
    ImageCropperModule,
    // App
    AppRoutingModule,
    LayoutModule,
    ToastrModule.forRoot({
      toastClass: 'toast'
    }),
    // Libs
    SweetAlert2Module.forRoot({ provideSwal }),
    ToastrModule.forRoot({
      toastClass: 'toast'
    }),

    //Tel validation
    Ng2TelInputModule,




    
  ],

  providers: [
    Title,
    AppService,
    AccountDataManagerService,

    //API services
    MarketAnalysisDataApiService,
    MarketOrderApiService,
    AuthApiService,
    SecurityApiService,
    MemberDepositApiService,
    MemberWithdrawApiService,
    MemberInterestPaymentApiService,
    CardPaymentService,
    PerfectMoneyService,
    InvestmentProfitApiService,
    SponsorshipProfitService,


    //Toasts Service
    AppToastService,

    //Service
    StripePaymentService,
    


    //Interceptors
     httpInterceptorProviders,

    //Base href
    {provide: APP_BASE_HREF, useValue: "/blueship-invest"},

     //Custom Validators
     AsyncMemberReferenceValidator
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
