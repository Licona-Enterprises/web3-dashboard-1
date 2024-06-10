import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import * as data from './mock_data.json';

interface JsonData { 
  read: number; time: Date; used: number; user: number; wait: number; cache: number; write: number; system: number; buffers: number; inbound: number; outbound: number;
}

@Component({
  selector: 'app-perp-position-page',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './perp-position-page.component.html',
  styleUrl: './perp-position-page.component.less'
})

export class PerpPositionPageComponent {
  dps1: any = [];
  dps2: any = [];
  dps3: any = [];
  charts: any = [];
 
  toolTip = {
    shared: true,
  };
  legend = {
    cursor: 'pointer',
    itemclick: function (e: any) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    },
  };
 
  systemDps: any = [];
  userDps: any = [];
  waitDps: any = [];
  buffersDps: any = [];
  cacheDps: any = [];
  usedDps: any = [];
  inboundDps: any = [];
  outboundDps: any = [];
  writeDps: any = [];
  readDps: any = [];
  onToolTipUpdated: any;
  onToolTipHidden: any;
  onCrosshairUpdated: any;
  onCrosshairHidden: any;
  onRangeChanged: any;
 
  cpuChartOptions = {
    animationEnabled: true,
    theme: 'dark1', 
    title: {
      text: '',
    },
    toolTip: this.toolTip,

    axisX: {
      valueFormatString: 'DD MMM',
    },

    axisY: {
      valueFormatString: '$#,000',
    },
    legend: this.legend,
    data: [
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Funds Available',
        yValueFormatString: '$#,000.#',
        color: '#64b5f6',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        legendMarkerType: 'square',
        dataPoints: this.userDps,
      },
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Margin Used',
        yValueFormatString: '$#,000.#',
        color: '#2196f3',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        legendMarkerType: 'square',
        dataPoints: this.systemDps,
      },
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Account Leverage',
        yValueFormatString: '$#.#x',
        color: '#05FAF7',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        legendMarkerType: 'square',
        dataPoints: this.waitDps,
      },
    ],
  };

  memoryChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: '',
    },
    axisX: {
      valueFormatString: 'DD MMM',
    },
    axisY: {
      valueFormatString: '$#,000',
    },
    toolTip: this.toolTip,
    legend: this.legend,
    data: [
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Account',
        color: '#e57373',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        yValueFormatString: '$#,000.##',
        legendMarkerType: 'square',
        dataPoints: this.cacheDps,
      },
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Unrealized P&L',
        color: '#f44336',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        yValueFormatString: '$#,000.##',
        legendMarkerType: 'square',
        dataPoints: this.buffersDps,
      },
      // {
      //   type: 'splineArea',
      //   showInLegend: 'true',
      //   name: 'Used',
      //   color: '#d32f2f',
      //   xValueType: 'dateTime',
      //   xValueFormatString: 'DD MMM YY HH:mm',
      //   yValueFormatString: '#.## GB',
      //   legendMarkerType: 'square',
      //   dataPoints: this.usedDps,
      // },
    ],
  };

  networkChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: '',
    },
    axisX: {
      valueFormatString: 'DD MMM',
    },
    axisY: {
      valueFormatString: '$#,000',
    },
    toolTip: this.toolTip,
    legend: this.legend,
    data: [
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Deposits',
        color: '#81c784',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        yValueFormatString: '$#,000.##',
        legendMarkerType: 'square',
        dataPoints: this.outboundDps,
      },
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Borrows',
        color: '#388e3c',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        yValueFormatString: '$#,000.##',
        legendMarkerType: 'square',
        dataPoints: this.inboundDps,
      },
    ],
  };

  diskChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: '',
    },
    axisX: {
      valueFormatString: 'DD MMM',
    },
    axisY: {},
    toolTip: this.toolTip,
    legend: this.legend,
    data: [
      {
        type: 'splineArea',
        showInLegend: 'true',
        name: 'Net Funding',
        color: '#ffb74d',
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM',
        yValueFormatString: '$#.##',
        legendMarkerType: 'square',
        dataPoints: this.writeDps,
      }
    ],
  };
 
  getChartInstance = (chart: any) => {
    this.charts.push(chart);
  };
 
  jsonData: JsonData[] = (data as any).default;
 
  ngOnInit() {
    for (var i = 0; i < this.jsonData.length; i++) {

    
    
      // this.systemDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].system), });
      // this.userDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].user), });
      // this.waitDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].wait), });
      // this.buffersDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].buffers), });
      // this.cacheDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].cache), });
      // this.usedDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].used), });
      // this.inboundDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].inbound), });
      // this.outboundDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].outbound), });
      // this.writeDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].write), });
      // this.readDps.push({ x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].read), });

      this.systemDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].system), });
      this.userDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].user), });
      this.waitDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].wait), });
      this.buffersDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].buffers), });
      this.cacheDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].cache), });
      this.usedDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].used), });
      this.inboundDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].inbound), });
      this.outboundDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].outbound), });
      this.writeDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].write), });
      this.readDps.push({ x: new Date(this.jsonData[i].time), y: Number(this.jsonData[i].read), });

    }

  }
  ngAfterViewInit() {
    this.syncCharts(this.charts, true, true, true);
  }
 
  syncCharts = (
    charts: any,
    syncToolTip: any,
    syncCrosshair: any,
    syncAxisXRange: any
  ) => {
    if (!this.onToolTipUpdated) {
      this.onToolTipUpdated = function (e: any) {
        for (var j = 0; j < charts.length; j++) {
          if (charts[j] != e.chart)
            charts[j].toolTip.showAtX(e.entries[0].xValue);
        }
      };
    }
 
    if (!this.onToolTipHidden) {
      this.onToolTipHidden = function (e: any) {
        for (var j = 0; j < charts.length; j++) {
          if (charts[j] != e.chart) charts[j].toolTip.hide();
        }
      };
    }
 
    if (!this.onCrosshairUpdated) {
      this.onCrosshairUpdated = function (e: any) {
        for (var j = 0; j < charts.length; j++) {
          if (charts[j] != e.chart)
            charts[j].axisX[0].crosshair.showAt(e.value);
        }
      };
    }
 
    if (!this.onCrosshairHidden) {
      this.onCrosshairHidden = function (e: any) {
        for (var j = 0; j < charts.length; j++) {
          if (charts[j] != e.chart) charts[j].axisX[0].crosshair.hide();
        }
      };
    }
 
    if (!this.onRangeChanged) {
      this.onRangeChanged = function (e: any) {
        for (var j = 0; j < charts.length; j++) {
          if (e.trigger === 'reset') {
            charts[j].options.axisX.viewportMinimum = charts[
              j
            ].options.axisX.viewportMaximum = null;
            charts[j].options.axisY.viewportMinimum = charts[
              j
            ].options.axisY.viewportMaximum = null;
            charts[j].render();
          } else if (charts[j] !== e.chart) {
            charts[j].options.axisX.viewportMinimum =
              e.axisX[0].viewportMinimum;
            charts[j].options.axisX.viewportMaximum =
              e.axisX[0].viewportMaximum;
            charts[j].render();
          }
        }
      };
    }
 
    for (var i = 0; i < charts.length; i++) {
      //Sync ToolTip
      if (syncToolTip) {
        if (!charts[i].options.toolTip) charts[i].options.toolTip = {};
 
        charts[i].options.toolTip.updated = this.onToolTipUpdated;
        charts[i].options.toolTip.hidden = this.onToolTipHidden;
      }
 
      //Sync Crosshair
      if (syncCrosshair) {
        if (!charts[i].options.axisX)
          charts[i].options.axisX = {
            labelAngle: 0,
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: 'HH:mm',
            },
          };
 
        charts[i].options.axisX.crosshair.updated = this.onCrosshairUpdated;
        charts[i].options.axisX.crosshair.hidden = this.onCrosshairHidden;
      }
 
      //Sync Zoom / Pan
      if (syncAxisXRange) {
        charts[i].options.zoomEnabled = true;
        charts[i].options.rangeChanged = this.onRangeChanged;
      }
 
      charts[i].render();
    }
  };

}
