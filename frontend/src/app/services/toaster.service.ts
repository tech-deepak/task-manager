import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})

export class ToasterService {

	constructor(
		private toaster: ToastrService
	) { }

	success(message: string) {
		this.toaster.success(message, 'Success!');
	}

	warning(message: string) {
		this.toaster.warning(message, 'Warning!');
	}

	error(message: string) {
		this.toaster.error(message, 'Error!');
	}

	info(message: string) {
		this.toaster.info(message, 'Info!');
	}
}
