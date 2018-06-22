import { Injectable, Injector } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import { AuthService } from './auth.service';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private injector: Injector) { }

  get authService() {
    return this.injector.get(AuthService);
  }

  get router() {
    return this.injector.get(Router);
  }

  get stateService() {
    return this.injector.get(StateService);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin(route);
  }

  private checkLogin(route: any): boolean {
    const bool = this.authService.checkAuth();
    if (!bool) {
      this.router.navigate([this.stateService.config.router.login]);
    }
    return bool;
  }
}
