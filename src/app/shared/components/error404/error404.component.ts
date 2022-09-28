import { Component, HostBinding, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css'],
})
export class Error404Component implements OnInit {
  @HostBinding('class.routed-component')
  routed_component: boolean = true;
  
  constructor() {
    console.error('404 - Route not found');
  }

  ngOnInit(): void {}
}
