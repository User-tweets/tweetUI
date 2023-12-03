import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from '../../services/tweets.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogreplyComponent } from '../dialogreply/dialogreply.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-show-user-tweets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './show-user-tweets.component.html',
  styleUrl: './show-user-tweets.component.css'
})
export class ShowUserTweetsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private tweetService: TweetsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  username: any;
  tweets: any;
  getDetails() {
    this.activatedRoute.params.subscribe(
      (parameter) => (this.username = parameter['username'])
    );
    this.tweetService.getTweetByUsername(this.username).subscribe(
      (response) => {
        console.log('response -> '+response);
        this.tweets = response;
      },
      (error) => {
        console.error(error);
      }
    );
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
    });
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
}