import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-seefood',
  templateUrl: './seefood.component.html',
  styleUrls: ['./seefood.component.css']
})
export class SeefoodComponent implements OnInit {

  public fooditems: any[];
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.check();
    this.getFood();
  }

  getFood() {
    this.adminService.getAllFood().subscribe(
      data => {
        if (data['msg']) {
          this.fooditems = data['msg'];
          // console.log(data['msg']);
        }
        else {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
    // console.log();
  }

  check() {
    this.authService.check().subscribe(
      data => {
        console.log(data);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
  }

  addfooditem(item) {
    console.log("add");
    // console.log(item);
    this.adminService.setFood(item);
    this.router.navigate(['/admin/addfoodqty'])
  }


  deletefood(item) {
    // console.log("delete");

    console.log(item);
    this.adminService.deleteFood(item._id).subscribe(
      data => {
        if (data['msg']) {
          this.getFood();
        }
        else {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        console.log(error);
      }
    )
  }

  editfood(item) {
    // console.log("edit");
    this.adminService.setFood(item);
    this.router.navigate(['/admin/editfood'])
  }
}
