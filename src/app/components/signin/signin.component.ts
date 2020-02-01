import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
//import { error } from 'protractor';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: [ './signin.component.css' ],
})
export class SigninComponent implements OnInit {
	user = {
		email: '',
		password: '',
	};

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		if (this.authService.loggedIn()) {
			this.router.navigate([ '/index' ]);
		}
		this.authService.userExists().subscribe(res => {
			if (res.length < 0) {
				this.router.navigate([ '/signup' ]);
			}
		});
	}

	signIn() {
		if (this.validator()) {
			this.authService.signInUser(this.user).subscribe(
				res => {
					localStorage.setItem('token', res.token);
					this.router.navigate([ '/index' ]);
				},
				err => {
					swal.fire({
						icon: 'error',
						title: 'Error',
						text: err.error.message,
						timer: 2000,
					});
				}
			);
		}
	}

	validator() {
		if (this.user.email == '') {
			swal.fire({
				icon: 'warning',
				title: 'Warning',
				text: 'Email is empty',
				timer: 2000,
			});
			return false;
		}
		if (this.user.password == '') {
			swal.fire({
				icon: 'warning',
				title: 'Warning',
				text: 'Password is empty',
				timer: 2000,
			});
			return false;
		}
		return true;
	}
}
