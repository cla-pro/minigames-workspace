import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advent-group-chooser',
  standalone: true,
  imports: [],
  templateUrl: './advent-group-chooser.component.html',
  styleUrl: './advent-group-chooser.component.css'
})
export class AdventGroupChooserComponent {
  constructor(private router: Router) {}

  registerGroup(groupname: string | undefined) {
    if (groupname !== undefined && this.isGroupnameValid(groupname) && this.isKnownGroupname(groupname)) {
      localStorage.setItem('group', groupname);
      console.log('Group set: ' + groupname);
      this.router.navigate(['']);
    }
  }

  private isGroupnameValid(groupname: string) {
    return groupname.length > 0;
  }

  private isKnownGroupname(groupname: string) {
    return groupname === 'Benoist' || groupname === 'Lavanchy' || groupname === 'Catry';
  }
}
