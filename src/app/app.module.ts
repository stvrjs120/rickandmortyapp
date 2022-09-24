import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { Error404Component, ToolbarComponent } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ToolbarComponent,
    Error404Component,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
