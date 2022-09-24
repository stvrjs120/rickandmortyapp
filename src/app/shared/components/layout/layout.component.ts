import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../services';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  loading = true;
  title = 'Rick and Morty App';
  faTv = faTv;

  constructor(
    private router: Router,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {}
}
