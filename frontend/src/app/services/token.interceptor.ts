import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	defaultHeaders: any = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};

	loaderCount: any = [];
	token = sessionStorage.getItem('token');

	constructor(
		private router: Router,
		private toaster: ToasterService
	) { }

	buildRequestHeaders(): HttpHeaders {
		const headers = this.defaultHeaders;
		// set API-Token if available
		if (!!this.token) {
			headers['token'] = this.token;
		}
		return new HttpHeaders(headers);
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = this.buildRequestHeaders();
		const authReq = request.clone({ headers });
		return next.handle(authReq).pipe(map((event: any) => {
			console.log(event)
			if (event['status'] == 200) {

			} else {
				// this.toaster.error('')
			}

			return event;
		}), catchError((err: any) => {

			if(err.status == 401) {
				this.toaster.error('Session is expired! Please login again')
				this.router.navigate(['/login']);
			}

			return throwError(err);
		}));
	}
}
