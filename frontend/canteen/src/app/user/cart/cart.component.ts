import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[];
  total: any;
  arr: any[];
  public errorMessage: any;
  public styl: any;
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    if (this.authService.getCount() == 0) {
      this.authService.setCount(0);
      this.router.navigate(['/empty-cart']);
    }
    this.webSocketService.listen('cart').subscribe(
      (data) => {
        console.log(data);
        this.getdata();
      }
    )
    this.check();
    this.getdata();
  }


  getdata() {
    this.userService.getcart().subscribe(
      data => {
        // console.log(data);
        if (data['errormsg']) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        if (data['empty'] == true) {
          this.authService.setCount(0);
          this.router.navigate(['/empty-cart']);
        }
        else {
          console.log(data);
          this.arr = data[0];
          console.log(this.arr);
          if (this.arr == undefined) {
            this.authService.setCount(0);
            this.router.navigate(['/empty-cart']);
          }
          else {
            this.items = this.arr['items'];
            this.total = this.arr['total'];
          }
        }

        // console.log(this.items);
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
  check() {
    this.authService.check().subscribe(
      data => {
        console.log(data);
        if (data) {
          this.getdata();
        }
        // console.log(data.total);
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

  delete(item) {
    console.log("delte");
    console.log(item);
    this.userService.deleteFromCart(item).subscribe(
      data => {
        console.log(data);
        this.setMessage("successfully deleted item", "#f04747");
        // console.log(data.total);
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


  pay() {
    console.log("payyyy");
    // this.document.location.href = 'http://localhost:3000/user/paytm';
    // window.

    this.userService.paytm({}).subscribe(
      data => {
        console.log("data");
        console.log(data);
        console.log("data");
        // this.router.navigate(['/paytm'])
      },
      (error) => {
        // console.log(error.s);
        // if (error instanceof HttpErrorResponse) {
        //   this.authService.logoutUser();
        // this.router.navigate(['/error'])
        // }
        console.log('error');
        console.log(error);
        console.log('error');
      }
    )
  }

  setMessage(msg: any, color: any) {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }

  placeorder() {
    console.log("place order");
    this.userService.placeOrder({}).subscribe(
      data => {
        console.log("data");
        console.log(data);
        console.log("data");

      },
      (error) => {
        // console.log(error.s);
        // if (error instanceof HttpErrorResponse) {
        //   this.authService.logoutUser();
        // this.router.navigate(['/error'])
        // }
        console.log('error');
        console.log(error);
        console.log('error');
      }
    )
  }
}