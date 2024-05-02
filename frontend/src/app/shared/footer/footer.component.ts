import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import moment from 'moment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  isShowFooter: boolean;
  year: number;

  constructor( private router: Router) {
    this.isShowFooter = this.router.url  === '/home';
    this.year = moment().year();
  }
}
