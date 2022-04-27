import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service'
import {NavbarService} from '../../services/navbar.service'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    user;
    imageToShow: any;
    isImageLoading: boolean;
    constructor(private sanitizer: DomSanitizer, private UserService: UserService, public nav : NavbarService) {}

    ngOnInit() { 
        // this.UserService.$user.subscribe(res=>{
        //     this.getImageFromService()
        //     this.user = res.user.name
        //     },err =>{
        //     console.log(err)
        // })
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getImageFromService() {
        this.nav.showSpinner()
        this.isImageLoading = true;
        this.UserService.getAvatar().subscribe(data => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
            this.nav.hideSpinner()
        }, error => {
            this.isImageLoading = false;
            // console.log(error);
            this.nav.hideSpinner()
        });
    }

    joinWithGoogle(){
        window.open('https://shehaly-studio.herokuapp.com/auth/google');
    }

}
