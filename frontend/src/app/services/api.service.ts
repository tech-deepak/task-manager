import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	bashUrl = 'http://localhost:3000';

	constructor(
		private http: HttpClient,
		private commonService: CommonService
	) { }

	get(callback: string, queryParams: any = '', bashUrl = this.bashUrl) {
		if (!!queryParams && !!Object.keys(queryParams).length) {
			queryParams = `?${this.commonService.jsonToQueryString(queryParams)}`;
		}
		return this.http.get(bashUrl + callback + queryParams).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}

	post(callback: string, payload: any, bashUrl = this.bashUrl) {
		return this.http.post(bashUrl + callback, payload).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}

	put(callback: string, payload: any, bashUrl = this.bashUrl) {
		return this.http.put(bashUrl + callback, payload).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}

	patch(callback: string, payload: any, bashUrl = this.bashUrl) {
		return this.http.patch(bashUrl + callback, payload).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}

	delete(callback: string, payload?: any, bashUrl = this.bashUrl) {
		return this.http.delete(bashUrl + callback, payload).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}



	postThirdParty(callback: string, payload: any, headers?: any) {
		return this.http.post(callback, payload, { 'headers': headers }).pipe(
			map((res: any) => res),
			catchError(error => throwError(error.error || 'Server Error')));
	}
}
