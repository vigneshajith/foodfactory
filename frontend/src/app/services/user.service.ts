import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import { IUserLogin } from '../shared/Interface/IUserLogin';
import { IUserReg } from '../shared/Interface/IUserReg';
import { User } from '../shared/model/user';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  register(newUser: IUserReg): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, newUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success("welcome to foodFactory" + user.name,"Register Successfully")
        },
        error: (err) => {
          this.toastrService.error(err.error,"Register Failed")
        }

      })
    )
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FoodFactory ${user.name}!`,
            `Login Successful`
          )
        },
        error: (err) => {
          this.toastrService.error(err.error, `Login Failed`)
        },
      })
    )
  }

  logOut() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY)
    if (userJson) return JSON.parse(userJson) as User;
    return new User()
  }

}
