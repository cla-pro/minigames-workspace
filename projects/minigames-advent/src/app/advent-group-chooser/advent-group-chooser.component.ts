import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advent-group-chooser',
  templateUrl: './advent-group-chooser.component.html',
  styleUrl: './advent-group-chooser.component.css'
})
export class AdventGroupChooserComponent {
  public errorText: string | null = null;

  constructor(private router: Router) {}

  registerGroup(groupname: string | undefined) {
    if (groupname === undefined || this.isGroupnameInvalid(groupname)) {
      this.errorText = "Nom du groupe vide ou invalide";
      return;
    }
    let fixedGroupname = this.fixCase(groupname);
    if (this.isGroupnameUnknown(fixedGroupname)) {
      this.errorText = "Nom du groupe inconnu";
      return;
    }
    
    localStorage.setItem('group', fixedGroupname);
    this.errorText = null;
    this.router.navigate(['']);
  }

  private isGroupnameInvalid(groupname: string) {
    return groupname.length === 0;
  }

  private isGroupnameUnknown(groupname: string) {
    return groupname !== 'Benoist' && groupname !== 'Lavanchy' && groupname !== 'Catry' && groupname !== 'Doudette';
  }

  private fixCase(groupname: string) {
    return groupname.charAt(0).toUpperCase() + groupname.slice(1).toLowerCase();
  }
}
