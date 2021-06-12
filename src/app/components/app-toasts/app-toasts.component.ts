import { Component, OnInit } from '@angular/core';
import { AppToastService } from 'src/app/services/component/app-toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.css']
})
export class AppToastsComponent implements OnInit {

  constructor(
    public toastsService: AppToastService
  ) { }

  ngOnInit(): void {
  }

}
