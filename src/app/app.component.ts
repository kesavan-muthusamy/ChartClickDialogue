import { Component, ViewChild, AfterViewChecked, OnInit, ElementRef } from '@angular/core';

import { EmitType } from '@syncfusion/ej2-base';
import { Axis, AxisModel, IMouseEventArgs, getValueXByPoint } from '@syncfusion/ej2-charts';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit {
  data: object[] = this.getChartData();
  dataFirst: object = this.getChartData(0, 6);
  dataSecond: object = this.getChartData(6, 12);

  xAxismodel: object = {
    valueType: 'DateTime',
    skeleton: 'yMd'
  };
  firstDrill: boolean;

  @ViewChild('chart')
  chart: ChartComponent;
  xAxis: Axis;
  xValue: number;
  show: boolean = false;
  firstTitle: string = 'SecondaryLevelFirstHalf';
  secondTitle: string = 'SecondaryLevelSecondHalf';
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.

  @ViewChild('chart', { read: ElementRef }) chartElement: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  //To get all element of the dialog component after component get initialized.
  ngOnInit() {
    this.initilaizeTarget();
  }

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.chartElement.nativeElement.parentElement;
  }
  ngAfterViewChecked() {
    this.xAxis = this.chart.primaryXAxis as Axis;

  }


  mouseClick = (args: IMouseEventArgs) => {
    this.xValue = getValueXByPoint(Math.abs(args.x - this.xAxis.rect.x), this.xAxis.rect.width, this.xAxis);
    if (this.xValue <= (this.xAxis.actualRange.min + this.xAxis.actualRange.delta / 2)) {
      this.firstDrill = true;
      console.log('first half');
    } else {
      this.firstDrill = false;
      console.log('second half');
    }
    this.onOpenDialog();
  }

  getChartData(start: number = 0, end: number = 12, isMonth?: boolean, month?: number): object[] {
    const data: object[] = [];
    if (isMonth) {
      for (let i: number = start; i < 30; i++) {
        data.push({ x: new Date(2019, month, i), y: Math.random() });
      }
    } else {
      for (let i: number = start; i < end; i++) {
        data.push({ x: new Date(2019, i, 20), y: Math.random() });
      }
    }
    return data;
  }

  public onOpenDialog = function (): void {
    // Call the show method to open the Dialog
    this.ejDialog.show(true);
  }

  mouseClickFirst = (args: IMouseEventArgs) => {
    this.dataFirst = this.getChartData(0, 6, true, 2);
    this.firstTitle = 'ThirdLevelFirst';
  }

  mouseClickSecond = (args: IMouseEventArgs) => {
    this.dataSecond = this.getChartData(6, 12, true, 8);
    this.secondTitle = 'ThirdLevelSecond';
  }
}
