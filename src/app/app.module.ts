import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ChartAllModule, DialogAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
