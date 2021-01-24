import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';
import { Router } from '@angular/router';


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
    
    constructor(private UserService : UserService , public Route : Router) { }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            email : new FormControl ('', [Validators.required]),
            password : new FormControl ('' ,[Validators.required , Validators.maxLength(10)]),
            name : new FormControl('',[Validators.maxLength(10)])
        })
    }

    onSubmit(){
        let email = this.userForm.get('email').value
        let password = this.userForm.get('password').value
        this.UserService.login({email : email, password : password}).subscribe((res)=>{
            this.Route.navigate(['home'])
            console.log(res)
        }, err =>{
            console.log(err)
        })
    }
    get userEmail():any{
        return this.userForm.get('email')
    }   
}
