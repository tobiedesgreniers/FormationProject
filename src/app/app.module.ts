import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DataTableModule } from "angular-6-datatable";

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { DataService } from './data.service';
import { AuthService } from './services/auth.service'
import { AuthGuardService } from './services/auth.guard.service';

import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterWithPipe } from './pipes/filter-with.pipe';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    OrderByPipe,
    FilterWithPipe
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),

    // Module de Routing
    AppRoutingModule
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
