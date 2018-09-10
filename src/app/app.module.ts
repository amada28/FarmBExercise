import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule, TabViewModule, DataTableModule,InputSwitchModule,FileUploadModule ,
  PanelModule,OverlayPanelModule
} from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,CalendarModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
