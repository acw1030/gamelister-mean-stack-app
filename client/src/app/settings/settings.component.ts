import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User | undefined;
  target: User | undefined;

  users: User[] = [];
  usersFilter: string = '';

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.target = this.authService.getUser();
    if (this.user?.admin) {
      this.searchUsers();
    }
  }

  setTarget(_id: string): void {
    this.userService.getUser(_id).subscribe(result => this.target = result);
  }

  isYou(): boolean {
    if (this.user && this.target && this.user._id == this.target._id)
      return true;
    else return false;
  }

  refresh(): void {
    if (this.isYou()) this.authService.setUser(this.target);
    if (this.user?.admin) this.searchUsers();
  }

  searchUsers(): void {
    this.users = [];
    this.userService.getUsers(this.usersFilter).subscribe(result => this.users = result);
  }

  changeUsername(): void {
    if (this.target) {
      let prompt = window.prompt('Please enter a new username.');
      if (prompt && prompt != '') {
        this.userService.updateUser(this.target._id, prompt, this.target.email, this.target.admin, this.target.locked, this.target.lists)
          .subscribe(result => { this.target = result; alert('Username updated.'); this.refresh(); });
      }
    }
  }

  changeEmail(): void {
    if (this.target) {
      let prompt = window.prompt('Please enter a new email address.');
      if (prompt && prompt != '') {
        this.userService.updateUser(this.target._id, this.target.username, prompt, this.target.admin, this.target.locked, this.target.lists)
          .subscribe(result => { this.target = result; alert('Email updated.'); this.refresh(); });
      }
    }
  }

  changePassword(): void {
    if (this.target) {
      let prompt = window.prompt('Please enter a new password.');
      if (prompt && prompt != '') {
        this.userService.updateUserPassword(this.target._id, prompt)
          .subscribe(result => { this.target = result; alert('Password updated.'); this.refresh(); });
      }
    }
  }

  changeProps(): void {
    if (this.target) {
    this.userService.updateUser(this.target._id, this.target.username, this.target.email, this.target.admin, this.target.locked, this.target.lists)
    .subscribe(result => { this.target = result; alert('User updated.'); this.refresh(); });
    }
  }

  deadminSelf(): void {
    if (this.user) {
      if (confirm("Remove administrator privileges?\n*You will not be able to recover them without help from another Administrator.*")) {
        this.userService.updateUser(this.user._id, this.user.username, this.user.email, false, this.user.locked, this.user.lists).subscribe(result => { this.user = result; this.target = result; this.refresh(); });
      }
    }
  }

  deactivateSelf(): void {
    if (this.user) {
      if (confirm("Deactivate account?\n*You will not be able to recover your account without help from an Administrator.*")) {
        this.userService.updateUser(this.user._id, this.user.username, this.user.email, this.user.admin, true, this.user.lists).subscribe(() => this.authService.logout());
      }
    }
  }

}
