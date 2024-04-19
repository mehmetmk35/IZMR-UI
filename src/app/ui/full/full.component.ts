import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit, OnInit} from '@angular/core';
import { MenuItems } from '../../services/menu-items/menu-items';
import { AuthService } from 'src/app/services/common/auth.service';
import {Location} from '@angular/common';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnInit,OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private authService:AuthService, private location: Location
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.authService.identityCheck();
 }


 
 isOnLoginPage() {
   var titlee = this.location.prepareExternalUrl(this.location.path());
   titlee = titlee.slice(1);
   if (titlee.includes('login') ) {
       return false;
   } else {
       return true;
   }
}
 
}
