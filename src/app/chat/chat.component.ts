import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IMessage } from '../models/message';
import { client } from '../DialogFlowclient';
import { User } from '../models/user';
import { Authentication } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { TextAnalyse } from '../services/data.service';

declare var $ :any;
@Component({
   templateUrl: 'chat.component.html',
   styleUrls: ['./chat.component.css']
  })
export class ChatComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    conversation: IMessage[] = [];

    constructor(
        private authenticationService: Authentication,
        private userService: UserService,
        private data: TextAnalyse
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    addMessageFromUser(message) {
      $('mat-list').scrollTop($('mat-list')[0].scrollHeight);
      if ((message.value) == ''){
        alert('Send some message');
      }
      this.data.httpPost(message.value).subscribe(data=>{
        console.log(JSON.stringify(data));
      });
      this.conversation.push({
        avatar: 'perm_identity',
        from: '',
        content: message.value
      });

      client.textRequest(message.value).then((response) => {
        this.conversation.push({
          avatar: 'android',
          from: 'Dialogflow',
          content: response.result.fulfillment.speech || 'Sorry try again later'
        });
        message.value = '';
      });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    removeUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

}
