import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import sw from 'sweetalert';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: [ './index.component.css' ],
})
export class IndexComponent implements OnInit {
	projects = [];

	constructor(private projectService: ProjectService) {}

	ngOnInit() {
		this.GetProjects();
	}

	delete(idProject) {
		this.projectService.deleteProject(idProject).subscribe(
			res => {
				sw({
					icon: 'success',
					title: 'Success',
					text: res.message,
					timer: 1000,
				});
				this.GetProjects();
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

	GetProjects() {
		this.projectService.getProjects().subscribe(
			res => {
				this.projects = res;
			},
			err => {
				console.log(err);
			}
		);
	}
}
