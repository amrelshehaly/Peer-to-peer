import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import {UserService} from '../../services/user.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import {NavbarService} from '../../services/navbar.service'
import {ToastrService} from 'ngx-toastr'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    userForm : FormGroup
    isLoginMode = true ;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    
    constructor(
        private UserService : UserService , 
        public Route : Router, 
        private element : ElementRef,
        public toast : ToastrService,
        public nav: NavbarService

        ) { }


    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            email : new FormControl ('', [Validators.required]),
            password : new FormControl ('' ,[Validators.required , Validators.maxLength(10)]),
            name : new FormControl('',[Validators.maxLength(10)])
        })
        // let menuHide:HTMLElement =  this.element.nativeElement;
         document.getElementById('navbar').style.display = "none"
        // menuHidel.style.display = "none"
    }

    onSubmit(){
        this.nav.showSpinner()
        let email = this.userForm.get('email').value
        let password = this.userForm.get('password').value
        let name = this.userForm.get('name').value
        if(this.isLoginMode){
            this.UserService.login({email : email, password : password}).subscribe((res)=>{
                document.getElementById('navbar').style.display = "block"
                this.nav.hideSpinner()
                this.Route.navigate(['user-profile'])
                // console.log(res)
            }, err =>{
                this.nav.hideSpinner()
                this.toast.error("","Password or Email is incorrect",{
                    timeOut:3000
                })
                console.log(err)
            })
        }else{
            this.UserService.signUp({email:email , password :password , name: name}).subscribe((res)=>{
                document.getElementById('navbar').style.display = "block"
                this.nav.hideSpinner()
                this.Route.navigate(['user-profile'])
            }, err =>{
                this.nav.hideSpinner()
                this.toast.error("","This Email already Exist !",{
                    timeOut:3000
                })
                console.log(err)
            })
        }
        
    }
    get userEmail():any{
        return this.userForm.get('email')
    }
}
