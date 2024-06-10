import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { StakingpageComponent } from './stakingpage/stakingpage.component';
import { PerpPositionPageComponent } from './perp-position-page/perp-position-page.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'staking', component: StakingpageComponent },
    { path: 'perp-position', component: PerpPositionPageComponent },
    
];