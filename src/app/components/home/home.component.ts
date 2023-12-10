import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsService } from '../../services/tweets.service';
import { DialogupdateComponent } from '../dialogupdate/dialogupdate.component';
import { DialogreplyComponent } from '../dialogreply/dialogreply.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,  MatCardModule, MatIconModule, MatButtonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private tweetService: TweetsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('username');
    this.getTweetByUsername();
  }

  isUpdate: boolean = false;
  updateBody = {
    message: '',
  };
  updateTweet(id: string, username: string) {
    const dialogRef = this.dialog.open(DialogupdateComponent, {
      width: '250px',
      data: { message: this.updateBody.message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == null || result == '') alert('empty tweet body');
      else {
        this.updateBody.message = result;
        console.warn(result);
        this.tweetService.updateTweet(id, username, this.updateBody).subscribe(
          (response) => {
            console.log(response);
            location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  isReply: boolean = false;
  replyBody = {
    username: '',
    comment: '',
  };
  replyTweet(id: string, username: string) {
    const dialogRef = this.dialog.open(DialogreplyComponent, {
      width: '250px',
      data: {
        username: this.replyBody.username,
        comment: this.replyBody.comment,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == null || result == '') alert('empty Comment');
      else {
        this.replyBody.comment = result;
        this.replyBody.username = localStorage.getItem('username')!;
        console.warn(this.replyBody);
        this.tweetService.replyTweet(id, username, this.replyBody).subscribe(
          (response) => {
            console.log(response);
            location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  user: any;
  tweets: any;
  getTweetByUsername() {
    console.log(this.user);
    if (this.user != null || this.user != '') {
      this.tweetService.getTweetByUsername(this.user).subscribe(
        (response) => {
          console.warn(response);
          this.tweets = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  delete(id: string, username: string) {
    console.log(id);
    console.log(username);

    this.tweetService.deleteTweet(id, username).subscribe(
      (response) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.log(error);
        location.reload();
      }
    );
  }

  tweet = {
    username: '',
    message: '',
    time: '',
  };
  postTweet() {
    this.tweet.username = this.tweetService.getUsername()!;
    this.tweet.time = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    this.tweetService.saveTweet(this.tweet.username, this.tweet).subscribe(
      (response) => {
        console.warn(response);
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  like(id: any) {
    this.tweetService
      .likeTweet(this.tweetService.getUsername()!, id.toLocaleString())
      .subscribe(
        (response) => {
          console.warn(response);
          window.alert('liked');
        },
        (error) => {
          console.error(error);
        }
      );
    console.warn(id);
  }
  reply(id: any) {
    console.warn(id);
  }

  getTweets() {
    this.tweetService.getAllTweets().subscribe(
      (response) => {
        console.log(response);
        this.tweets = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}