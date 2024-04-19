import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AppSidebarComponent } from './sidebar/sidebar.component'; 
import { MatIconModule } from '@angular/material/icon';  
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppHeaderComponent } from './header/header.component';
import { FullComponent } from './full.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AppSidebarComponent,
    FullComponent,AppHeaderComponent
  ],
  imports: [
    CommonModule,         
    MatListModule,
    MatMenuModule,         
    MatSidenavModule,        
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgFor, NgIf, RouterModule, CommonModule
  ],
  exports:[FullComponent,AppSidebarComponent,AppHeaderComponent]
})
export class FullModule { }
