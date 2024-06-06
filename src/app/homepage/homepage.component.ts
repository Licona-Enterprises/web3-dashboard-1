import {ChangeDetectionStrategy, Component, Inject, OnInit, ElementRef} from '@angular/core';
import {TuiArcChartModule} from '@taiga-ui/addon-charts';
import {tuiSum} from '@taiga-ui/cdk';

import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';

// chart imports
import {TuiLineChartModule} from '@taiga-ui/addon-charts';
import {TUI_DEFAULT_STRINGIFY, TuiContextWithImplicit} from '@taiga-ui/cdk';
import {TuiPoint} from '@taiga-ui/core';
import { TuiAxesModule } from '@taiga-ui/addon-charts'; 

import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TuiArcChartModule, TuiInputModule, FormsModule, TuiLineChartModule, TuiAxesModule],
  templateUrl: './homepage.component.html',
  // styleUrl: './homepage.component.css',
  styleUrl: './homepage.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {

  // for multiple arc chart
  readonly mulitArcValue2 = [40, 30, 20, 10];
  activeItemIndex = NaN;


  // for simple arc chart 
  private readonly labels = ['Food', 'Cafe', 'Open Source', 'Taxi', 'other'];
  readonly value = [13769, 12367, 10172, 3018, 2592];
  readonly sum = tuiSum(...this.value);
  getValue(index: number): number {
      return Number.isNaN(index) ? this.sum : this.value[index];
  }
  getLabel(index: number): string {
      return Number.isNaN(index) ? 'Total' : this.labels[index];
  }

  // for multi line chart 
  readonly multiLineValueFuckAll: readonly TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

  readonly stringify = TUI_DEFAULT_STRINGIFY;

  readonly hintContent = ({
      $implicit,
  }: TuiContextWithImplicit<readonly TuiPoint[]>): number => $implicit[0][1];





  

  


}
