import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent {

	loginForm: FormGroup;

	constructor(
		public api: ApiService,
		public route: Router,
		public toaster: ToasterService
	) {
		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl('')
		})
	}

	onSubmit() {
		this.api.post('/login', this.loginForm.value).subscribe(async (res) => {
			console.log(res)
			if(res.success){
				await this.toaster.success('Login Successfully!')
				await sessionStorage.setItem('token', res.token);
				await sessionStorage.setItem('user', JSON.stringify(res.user));
				await this.route.navigate(['/task-manager']);
			}
		})
	}
}
