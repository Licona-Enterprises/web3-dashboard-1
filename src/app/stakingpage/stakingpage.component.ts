import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CanvasJSAngularChartsModule, CanvasJS } from '@canvasjs/angular-charts';
 
 

@Component({
  selector: 'app-stakingpage',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './stakingpage.component.html',
  styleUrl: './stakingpage.component.less',
})

export class StakingpageComponent {

  constructor() {
    CanvasJS.addColorSet("customColorSet",["#ffcb06", "#ce1249", "#3a943c", "#7f3e83", "#812900", "#2078b6", "#df7f2e", "#e3e3e3"]);
  }
  // doughnut chart data
  chartOptions = {
    animationEnabled: true,
    theme: "dark1",
    colorSet: "customColorSet",
    title:{
      text: ""
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      innerRadius: "90%",
      yValueFormatString: "#,##0.00'%'",
      dataPoints: [
      { y: 33, name: "NodeID-9BCUhY6Q2Eji4J1u6MV9XKnP" },
      { y: 33, name: "NodeID-4MqtiVkCYGD4TmoBhH3b6a6U" },
      { y: 33, name: "NodeID-kXTWkRtur8X9vchkcXAiG6qD" }
      ]
    }]
    }


    // line chart data 
    chartOptions2 = {
      animationEnabled: true,
      theme: "dark1",
      title:{
        text: ""
      },
      axisX:{
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "",
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },  
      legend:{
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        dockInsidePlotArea: true,
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else{
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Network Yield",
        lineDashType: "dash",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        dataPoints: [
          { x: new Date(2022, 0, 3), y: 6.50 },
          { x: new Date(2022, 0, 4), y: 7.00 },
          { x: new Date(2022, 0, 5), y: 7.10 },
          { x: new Date(2022, 0, 6), y: 6.58 },
          { x: new Date(2022, 0, 7), y: 7.34 },
          { x: new Date(2022, 0, 8), y: 9.63 },
          { x: new Date(2022, 0, 9), y: 8.47 },
          { x: new Date(2022, 0, 10), y: 8.53 },
          { x: new Date(2022, 0, 11), y: 8.69 },
          { x: new Date(2022, 0, 12), y: 9.43 },
          { x: new Date(2022, 0, 13), y: 9.70 },
          { x: new Date(2022, 0, 14), y: 8.69 },
          { x: new Date(2022, 0, 15), y: 8.90 },
          { x: new Date(2022, 0, 16), y: 9.30 }
        ]
      },
      {
        type: "line",
        showInLegend: true,
        name: "Real Yield",
        lineDashType: "dot",
        dataPoints: [
          { x: new Date(2022, 0, 3), y: 5.10 },
          { x: new Date(2022, 0, 4), y: 5.60 },
          { x: new Date(2022, 0, 5), y: 5.40 },
          { x: new Date(2022, 0, 6), y: 5.58 },
          { x: new Date(2022, 0, 7), y: 5.44 },
          { x: new Date(2022, 0, 8), y: 6.93 },
          { x: new Date(2022, 0, 9), y: 6.57 },
          { x: new Date(2022, 0, 10), y: 6.63 },
          { x: new Date(2022, 0, 11), y: 6.39 },
          { x: new Date(2022, 0, 12), y: 6.73 },
          { x: new Date(2022, 0, 13), y: 6.60 },
          { x: new Date(2022, 0, 14), y: 5.62 },
          { x: new Date(2022, 0, 15), y: 6.43 },
          { x: new Date(2022, 0, 16), y: 5.70 }
        ]
      }]
    }	

  
}
