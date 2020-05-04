import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(public http: HttpServiceService) { }

  ngOnInit() {
  }
}
