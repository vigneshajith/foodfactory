import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserReg } from 'src/app/shared/Interface/IUserReg';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  RegisterFrom!: FormGroup;
  isSubmited = false;

  returnUrl = "";
  constructor(
    private fromBuilder: FormBuilder,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.RegisterFrom = this.fromBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        address:['',Validators.required]
      }, {
        validators: PasswordsMatchValidator('password', 'confirmPassword')
      })
      this.returnUrl = this.activatedRouter.snapshot.queryParams.returnUrl 
    }
  
  get fc() {
    return this.RegisterFrom.controls
  }

  submit() {
    this.isSubmited = true;
    if (this.RegisterFrom.invalid) return
    const fv =this.RegisterFrom.value
     const user:IUserReg = {
       name: fv.name,
       email: fv.email,
       password: fv.password,
       confirmPassword: fv.confirmPassword,
       address: fv.address,
    }

    this.userService.register(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}
