import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Form and http client (API)
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { CasesComponent } from './cases/cases.component';
import { CasesDetailsComponent } from './cases-details/cases-details.component';
import { AddCasesComponent } from './add-cases/add-cases.component';
import { EditCasesComponent } from './edit-cases/edit-cases.component';
import { CasesStatComponent } from './cases-stat/cases-stat.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    CasesComponent,
    CasesDetailsComponent,
    AddCasesComponent,
    EditCasesComponent,
    CasesStatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,

    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
