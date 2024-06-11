import {ChangeDetectionStrategy, Component, Inject, OnInit, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
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
import { ethers,Provider } from 'ethers';
import MetaMaskSDK from '@metamask/sdk';

// Define a custom type for the window object with the 'ethereum' property
interface CustomWindow extends Window {
  ethereum?: any; 
}


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TuiArcChartModule, TuiInputModule, FormsModule, TuiLineChartModule, TuiAxesModule, NgIf],
  templateUrl: './homepage.component.html',
  // styleUrl: './homepage.component.css',
  styleUrl: './homepage.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  @Input() isVisible: boolean = false;


  // for multiple arc chart
  readonly mulitArcValue2 = [40, 30, 20, 10];
  activeItemIndex = NaN;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('inside onchanges'  )

    if (changes['isVisible']) {
      const currentValue = changes['isVisible'].currentValue;
      console.log('isVisible changed to:', currentValue);
      this.isVisible = true;
      console.log('inside if onchanges'  )
      // Add any logic you want to perform when isVisible changes
    }
  }


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

  // Function to ask user to login into MetaMask
  async openMetaMaskWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Use the provider to interact with MetaMask wallet
      const signer = provider.getSigner();
      console.log('Signer:', signer);
      const address = await (await signer).getAddress();
      console.log('Connected address:', address);
      // this.isVisible = !this.isVisible;
      // console.log("2",this.isVisible);
      // this.isVisible = true;
      // console.log("3",this.isVisible);
    } else {
      console.log('MetaMask is not installed');
    }
    this.isVisible = true;
    console.log("4",this.isVisible);
    
  }

    // function to sign a message in metamask wallet
    async signMessage() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        console.log('Connected address:', address);
        const message = 'Successfully connected to Warthog';
        const signature = await (await signer).signMessage(message);
        console.log('Signature:', signature);
        // this.isVisible = true;
      } else {
        console.log('MetaMask is not installed');
      }
    }



  

  


}
