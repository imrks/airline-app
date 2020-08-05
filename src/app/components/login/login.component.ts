import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        location.pathname = ('flights');
      }
    });
    this.loginForm = new FormGroup({
      username:  new FormControl(null, Validators.required),
      password: new FormControl(null,Validators.required)
    });
  }

  Login(loginForm: FormGroup){
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    this.authService.getUserData(username).subscribe(data =>{
      if(data.length==0){
        Swal.fire('Error','Username does not exists','error');
      }
      else{
        if(data[0].password==password){
          if(data[0].role=='Admin'){
            Swal.fire('Logged in as','Admin','success');
            this.authService.loginSuccess(data[0]);
          }
          else if(data[0].role=='Staff'){
            Swal.fire('Logged in as',username,'success');
            this.authService.loginSuccess(data[0]);
          }
        }
        else{
          Swal.fire('Error','Wrong Password','error');
        }
      }
    })
  }

  SocialLogin(media:String){
    this.authService.SocialSignin(media).then(res =>{
      if(res.user){
        const userData = this.authService.updateUserData(res.user);
        Swal.fire(res.user.displayName,'Logged in as Admin','success');
        this.authService.loginSuccess(userData);
      }
    })
    
  }

}
