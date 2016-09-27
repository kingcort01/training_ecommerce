import { Component, OnInit } from '@angular/core';
//get data from router
// import { ActivatedRoute, Params  } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigate(['']) //make it navigate
  }

  // asdfds

}
