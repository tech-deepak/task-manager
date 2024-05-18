import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {

	if (sessionStorage.getItem('token')) {
		return true
	} else {
		let router = new Router;
		router.navigate(['/login'])
		return false;
	}
};
