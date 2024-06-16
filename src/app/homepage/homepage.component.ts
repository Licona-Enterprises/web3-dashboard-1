import {ChangeDetectionStrategy, Component, Inject, OnInit, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ethers,Provider } from 'ethers';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

// import MetaMaskSDK from '@metamask/sdk';

// Define a custom type for the window object with the 'ethereum' property
interface CustomWindow extends Window {
  ethereum?: any; 
}


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, RouterOutlet, CanvasJSAngularChartsModule], 
  templateUrl: './homepage.component.html',
  // styleUrl: './homepage.component.css',
  styleUrl: './homepage.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  chartOptions = {
	  animationEnabled: true,
	  theme: "dark1",
	  title:{
		text: ""
	  },
	  data: [{
		type: "pie",
		startAngle: 45,
		indexLabel: "{name}: {y}",
		indexLabelPlacement: "inside",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 21.3, name: "Vested" },
		  { y: 27.7, name: "Custody" },
		  { y: 25.5, name: "Staked" },
		  { y: 14.9, name: "Locked" },
		  { y: 10.6, name: "Fireblocks" },
		]
	  }]
	}



  chartOptions2 = {
    title: {
        text: ""
    },
    animationEnabled: true,
    theme: "dark1",
    yValueFormatString: "#,###.##",
    axisY: {
        prefix: "$",
    },
    axisX: {
        valueFormatString: "DDD"
    },
    toolTip: {
        shared: true,
        contentFormatter: function (e: any) {
            var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var content = weekday[e.entries[0].dataPoint.x.getDay()] + "<br/>";
            for (var i = e.entries.length - 1; i >= 0; i--) {
                var temp = e.entries[i].dataPoint.y;
                content += "<span style ='color:" + e.entries[i].dataSeries.color + "; font-weight: bold;';>" + e.entries[i].dataSeries.name + "</span>: $" + temp.toLocaleString() + "";
                content += "<br/>";
            }
            return content;
        }
    },
    legend: {
        cursor: "pointer",
        itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
    },
    data: [{
        type: "stackedArea",
        name: "Margin Usage",
        showInLegend: true,
        legendMarkerType: "square",
        color: "rgba(211,19,14,.9)",
        markerSize: 0,
        dataPoints: [
            // { x: new Date(2020, 2, 15), y: 2.4 },
            // { x: new Date(2020, 2, 16), y: .6 },
            // { x: new Date(2020, 2, 17), y: .8 },
            // { x: new Date(2020, 2, 18), y: 1.6 },
            // { x: new Date(2020, 2, 19), y: 1.4 },
            // { x: new Date(2020, 2, 20), y: 1.4 },
            // { x: new Date(2020, 2, 21), y: 2.6 }
            { x: new Date(2020, 2, 15), y: 2400000 },
            { x: new Date(2020, 2, 16), y: 600000 },
            { x: new Date(2020, 2, 17), y: 800000 },
            { x: new Date(2020, 2, 18), y: 1600000 },
            { x: new Date(2020, 2, 19), y: 1400000 },
            { x: new Date(2020, 2, 20), y: 1400000 },
            { x: new Date(2020, 2, 21), y: 2600000 }
        ]
    },
    {
        type: "stackedArea",
        name: "Perp Position: Short AVAX",
        showInLegend: true,
        legendMarkerType: "square",
        markerSize: 0,
        color: "rgba(95,53,87,.9)",
        dataPoints: [
            // { x: new Date(2020, 2, 15), y: 3.3 },
            // { x: new Date(2020, 2, 16), y: 1.6 },
            // { x: new Date(2020, 2, 17), y: 2.1 },
            // { x: new Date(2020, 2, 18), y: 1.6 },
            // { x: new Date(2020, 2, 19), y: 1.4 },
            // { x: new Date(2020, 2, 20), y: 1.7 },
            // { x: new Date(2020, 2, 21), y: 4.6 }

            { x: new Date(2020, 2, 15), y: 3300000 },
            { x: new Date(2020, 2, 16), y: 1600000 },
            { x: new Date(2020, 2, 17), y: 2100000 },
            { x: new Date(2020, 2, 18), y: 1600000 },
            { x: new Date(2020, 2, 19), y: 1400000 },
            { x: new Date(2020, 2, 20), y: 1700000 },
            { x: new Date(2020, 2, 21), y: 4600000 } 
        ]
    },
    {
        type: "stackedArea",
        name: "Collateral Position: Long ETH",
        showInLegend: true,
        legendMarkerType: "square",
        markerSize: 0,
        color: "rgba(60,84,151,.9)",
        dataPoints: [
            // { x: new Date(2020, 2, 15), y: 2.4 },
            // { x: new Date(2020, 2, 16), y: 2 },
            // { x: new Date(2020, 2, 17), y: 2.8 },
            // { x: new Date(2020, 2, 18), y: 1.6 },
            // { x: new Date(2020, 2, 19), y: 1.4 },
            // { x: new Date(2020, 2, 20), y: 1.4 },
            // { x: new Date(2020, 2, 21), y: 1.6 }

            { x: new Date(2020, 2, 15), y: 2400000 },
            { x: new Date(2020, 2, 16), y: 2000000 },
            { x: new Date(2020, 2, 17), y: 2800000 },
            { x: new Date(2020, 2, 18), y: 1600000 },
            { x: new Date(2020, 2, 19), y: 1400000 },
            { x: new Date(2020, 2, 20), y: 1400000 },
            { x: new Date(2020, 2, 21), y: 1600000 }

            
        ]
    },
    {
        legendMarkerType: "square",
        name: "Total Notional",
        showInLegend: true,
        type: "stackedArea",
        markerSize: 0,
        color: "rgba(22,115,211,.9)",
        dataPoints: [
            // { x: new Date(2020, 2, 15), y: .4 },
            // { x: new Date(2020, 2, 16), y: 7 },
            // { x: new Date(2020, 2, 17), y: 6.8 },
            // { x: new Date(2020, 2, 18), y: 4.6 },
            // { x: new Date(2020, 2, 19), y: 6.4 },
            // { x: new Date(2020, 2, 20), y: 7.4 },
            // { x: new Date(2020, 2, 21), y: 1.6 }

            { x: new Date(2020, 2, 15), y: 400000 },
            { x: new Date(2020, 2, 16), y: 7000000 },
            { x: new Date(2020, 2, 17), y: 6800000 },
            { x: new Date(2020, 2, 18), y: 4600000 },
            { x: new Date(2020, 2, 19), y: 6400000 },
            { x: new Date(2020, 2, 20), y: 7400000 },
            { x: new Date(2020, 2, 21), y: 1600000 }
        ]
    }
    ]
}

chartOptions3 = {
    animationEnabled: true,  
    theme: "dark1",
    title:{
        text: ""
    },
    axisX: {
        // title: ""
    },
    axisY: { 
        suffix: "%"               
    },
    toolTip: {
        shared: true
    },
    legend: {
        cursor:"pointer",
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
              e.dataSeries.visible = false;
          } else {
              e.dataSeries.visible = true;
          }
          e.chart.render();
        }
    },
    data: [{        
        type: "spline",
        showInLegend: true,
        name: "Staking Rate",
        dataPoints: [
          { label: "Jan", y: 3.92 },     
          { label: "Feb", y: 3.31 },     
          { label: "Mar", y: 3.85 },     
          { label: "Apr", y: 3.60 },     
          { label: "May", y: 3.24 },     
          { label: "Jun", y: 3.22 },     
          { label: "Jul", y: 3.06 },     
          { label: "Aug", y: 3.37 },     
          { label: "Sep", y: 3.47 },     
          { label: "Oct", y: 3.79 },     
          { label: "Nov", y: 3.98 },     
          { label: "Dec", y: 3.73 }
        ]
    }, {        
        type: "spline",
        showInLegend: true,
        name: "Funding Rate",
        dataPoints: [
          { label: "Jan", y: 2.98 },     
          { label: "Feb", y: 3.11 },     
          { label: "Mar", y: 2.4 },     
          { label: "Apr", y: 0.63 },     
          { label: "May", y: 0.24 },     
          { label: "Jun", y: 0.08 },     
          { label: "Jul", y: 0.03 },     
          { label: "Aug", y: 0.14 },     
          { label: "Sep", y: 0.26 },     
          { label: "Oct", y: 0.36 },     
          { label: "Nov", y: 1.13 },     
          { label: "Dec", y: 1.79 }
        ]
    }, {        
        type: "spline",
        showInLegend: true,
        name: "Figment Staking Reward Reference Rate (STKR)",
        dataPoints: [
          { label: "Jan", y: 5.24 },     
          { label: "Feb", y: 4.09 },     
          { label: "Mar", y: 3.92 },     
          { label: "Apr", y: 2.75 },     
          { label: "May", y: 2.03 },     
          { label: "Jun", y: 1.55 },     
          { label: "Jul", y: 0.93 },     
          { label: "Aug", y: 1.16 },     
          { label: "Sep", y: 1.61 },     
          { label: "Oct", y: 3.24 },     
          { label: "Nov", y: 5.67 },     
          { label: "Dec", y: 6.06 }   
        ]
    }]
}



  

  


}
