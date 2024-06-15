import { Component } from '@angular/core';
import { ethers,Provider } from 'ethers';
import MetaMaskSDK from '@metamask/sdk';
import { Router } from '@angular/router';

// Define a custom type for the window object with the 'ethereum' property
interface CustomWindow extends Window {
  ethereum?: any; 
}


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private router: Router) {}

  // function to sign a message in metamask wallet
  async signMessage() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        console.log('Connected address:', address);
        const message = 'Welcome back Rodney \n \nSign to connect to mVOLT';
        const signature = await (await signer).signMessage(message);
        console.log('Signature:', signature);
        // this.isVisible = true;
      } else {
        console.log('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // if (typeof window.ethereum !== 'undefined') {
    //   await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   const provider = new ethers.BrowserProvider(window.ethereum);
    //   const signer = provider.getSigner();
    //   const address = await (await signer).getAddress();
    //   console.log('Connected address:', address);
    //   const message = 'Successfully connected to Warthog';
    //   const signature = await (await signer).signMessage(message);
    //   console.log('Signature:', signature);
    //   // this.isVisible = true;
    // } else {
    //   console.log('MetaMask is not installed');
    // }
    this.router.navigate(['/home']);
  }

}
