import { Injectable } from '@angular/core';
// import { AppConstants } from '../shared/app-constants';
// import { AppTools } from 'src/app/shared/app-tools';
// import jwt_decode from 'jwt-decode';
import { JsonPipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})

export class CommonService {

	constructor(
		private jsonPipe: JsonPipe
	) { }

	jsonToQueryString = (params: any) => {
		return Object.keys(params).map((key) => {
			return key + '=' + params[key];
		}).join('&');
	}

	queryStringToJson = (params: string) => {

		if (!params) { return; }

		return JSON.parse('{"' + decodeURI(params).replace('?', '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
	}
}