import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.css']
})
export class ReloadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public reload(): void {
    window.location.reload();
  }

}
