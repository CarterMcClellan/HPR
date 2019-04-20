import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {Injectable} from "@angular/core";

import {UsersService} from "./user.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {};
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken();

    var authRequest = req.clone({});
    if (authToken == null) {
      authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + "patrick mega laser")
      });
    }
    else {
      authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });
    }
    return next.handle(authRequest);
  }
}
