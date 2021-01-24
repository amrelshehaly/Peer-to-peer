export class User {
    user:{
        name: string;
        email: string;
    }
    token : any;
    avatar : any


    constructor(
        user,
        token,
        avatar
    ){
        this.user = user;
        this.avatar = avatar;
        this.token = token
    }
}

