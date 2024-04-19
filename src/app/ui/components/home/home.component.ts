import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  onMouseMove(event: MouseEvent) {
    const logoElement = this.elRef.nativeElement.querySelector('.logo');
    const containerWidth = this.elRef.nativeElement.offsetWidth;
    const containerHeight = this.elRef.nativeElement.offsetHeight;
  
    // Calculate new position based on mouse coordinates
    let newX = event.clientX - logoElement.offsetWidth / 2;
    let newY = event.clientY - logoElement.offsetHeight / 2;
  
    // Restrict movement within container bounds
    const maxLeft = containerWidth - logoElement.offsetWidth;
    const maxTop = containerHeight - logoElement.offsetHeight;
  
    newX = Math.min(Math.max(newX, 1110), maxLeft);
    newY = Math.min(Math.max(newY, 1110), maxTop);
  
    // Apply new position using Renderer2
    this.renderer.setStyle(logoElement, 'left', `${newX}px`);
    this.renderer.setStyle(logoElement, 'top', `${newY}px`);
  }
  
}
