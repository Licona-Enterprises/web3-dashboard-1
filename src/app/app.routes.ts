import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { StakingpageComponent } from './stakingpage/stakingpage.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'staking', component: StakingpageComponent }
];