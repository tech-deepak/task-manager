import { Component, ElementRef, EventEmitter, Output, ViewChild, } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-task-manager',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './task-manager.component.html',
	styleUrl: './task-manager.component.scss'
})

export class TaskManagerComponent {

	user: any;
	tasks: any = [];
	taskForm: FormGroup;
	@ViewChild('myButton', { static: true }) myButton: ElementRef<HTMLButtonElement> | null = null;
	@ViewChild('closeButton', { static: true }) closeButton: ElementRef<HTMLButtonElement> | null = null;
	config: any;

	constructor(
		public api: ApiService,
		public route: Router,
		public toaster: ToasterService
	) {
		if (sessionStorage.getItem('user')) {
			this.user = JSON.parse(sessionStorage.getItem('user') || '')
			this.getTask();
		}
		this.taskForm = new FormGroup({
			title: new FormControl(''),
			description: new FormControl(''),
			status: new FormControl(''),
		})
	}

	getTask() {
		this.api.get(`/get_tasks/${this.user._id}`).subscribe((res) => {
			this.tasks = res.tasks;
		})
	}

	newTask(task?: any) {
		if (this.myButton) {
			this.myButton.nativeElement.click();
		}
		this.taskForm = new FormGroup({
			id: new FormControl(task?._id || ''),
			title: new FormControl(task?.title || ''),
			description: new FormControl(task?.description || ''),
			status: new FormControl(task?.status || ''),
			user: new FormControl(this.user?._id)
		})
	}

	deleteTask(task: any, i: number) {
		this.api.delete(`/delete_task/${task._id}`).subscribe((res) => {
			this.toaster.success(res.message);
			this.tasks.splice(i, 1)
		})
	}

	addUpdate() {
		this.api.post(this.taskForm.value['id'] ? `/update_task/${this.taskForm.value['id']}` : `/create_task`, this.taskForm.value).subscribe((res) => {
			this.toaster.success(res.message);
			if (this.closeButton) {
				this.closeButton.nativeElement.click();
			}
			let index = this.tasks.findIndex((item: any) => item._id == res.task._id);
			if (index == -1) {
				this.tasks.push(res.task)
			} else {
				this.tasks.splice(index, 1, res.task);
			}
		})
	}

	logout() {
		sessionStorage.clear();
		this.route.navigate(['/login']);

	}
}
