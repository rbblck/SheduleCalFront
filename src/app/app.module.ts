import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './components/main-components/results/results.component';
import { HomeComponent } from './components/main-components/home/home.component';
import { HeaderComponent } from './components/main-components/header/header.component';
import { AppErrorHandler } from './app-error-handler';
import { PostService } from './service/post.service';
import { FormsModule } from '@angular/forms';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerPopupComponent } from './components/standalone-components/datepicker-popup/datepicker-popup.component';
import { CalculatorComponent } from './components/main-components/calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatepickerPopupComponent,
    CalculatorComponent
    
  ],
  providers: [
    PostService,
    NgbAlertConfig,
    DatepickerPopupComponent,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TestInterceptor,
    //   multi: true
    // },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
