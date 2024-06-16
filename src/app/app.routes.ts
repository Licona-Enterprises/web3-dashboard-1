import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StakingpageComponent } from './stakingpage/stakingpage.component';
import { PerpPositionPageComponent } from './perp-position-page/perp-position-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'staking', component: StakingpageComponent },
    { path: 'perp-position', component: PerpPositionPageComponent },
    
];