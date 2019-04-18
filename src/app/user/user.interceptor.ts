import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {Injectable} from "@angular/core";

import {UsersService} from "./user.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {};
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken();
    console.log(authToken);

    const authRequest = req.clone({});

    if (authToken == null) {
      const authRequest = req.clone({
        headers: req.headers.set("Authentication", "Bearer " + "patrick mega laser")
      });
    }
    else {
      const authRequest = req.clone({
        headers: req.headers.set("Authentication", "Bearer " + authToken)
      });
    }


    console.log(authRequest);

    return next.handle(authRequest);
  }
}
