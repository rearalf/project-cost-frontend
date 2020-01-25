import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import sw from 'sweetalert';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ],
})
export class SignupComponent implements OnInit {
	user = {
		name: '',
		email: '',
		password: '',
	};

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		if (this.authService.loggedIn()) {
			this.router.navigate([ '/index' ]);
		}
	}

	signUp() {
		if (this.validator()) {
			this.authService.signUpUser(this.user).subscribe(
				res => {
					sw({
						icon: 'success',
						title: 'Success',
						text: res.message,
						timer: 1500,
					});
					this.router.navigate([ '/signin' ]);
				},
				err => {
					sw({
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
			sw({
				icon: 'warning',
				title: 'Warning',
				text: 'Email is empty',
				timer: 2000,
			});
			return false;
		}
		if (this.user.password == '') {
			sw({
				icon: 'warning',
				title: 'Warning',
				text: 'Password is empty',
				timer: 2000,
			});
			return false;
		}
		if (this.user.name == '') {
			sw({
				icon: 'warning',
				title: 'Warning',
				text: 'Name is empty',
				timer: 2000,
			});
			return false;
		}
		return true;
	}
}
