import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: 'app/app/app.component.html',
})


export class AppComponent {

	classBoolean = true;
	toggleMenu(){
		this.classBoolean = !this.classBoolean;

	}


	changeClass(){
		let classes={
			'nav-md':this.classBoolean,
			'nav-sm':!this.classBoolean,
		}

		return classes;
		
	}


}
