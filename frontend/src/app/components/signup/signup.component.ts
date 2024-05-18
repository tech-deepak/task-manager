import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.scss'
})

export class SignupComponent {

	signForm: FormGroup;

	constructor(
		public api: ApiService,
		public route: Router,
		public toaster: ToasterService
	) {
		this.signForm = new FormGroup({
			name: new FormControl(''),
			email: new FormControl(''),
			password: new FormControl(''),
			confirmPassword: new FormControl('')
		})
	}

	onSubmit() {
		this.api.post('/signup', this.signForm.value).subscribe(async(res) => {
			console.log(res)
			if (res.success) {
				await this.toaster.success('Login Successfully!')
				await sessionStorage.setItem('token', res.token);
				await sessionStorage.setItem('user', JSON.stringify(res.user));
				await this.route.navigate(['/task-manager']);
			}
		})
	}
}
