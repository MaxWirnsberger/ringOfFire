import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from './player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  firestore: Firestore = inject(Firestore); // Firebase mit Projekt verknüpfen
  game = new Game();
  gameId: string | any;
  unsubList: any;
  gameDoc: any;
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngonDestroy() {
    this.unsubList();
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDoc(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const gameDocRef = doc(collection(this.firestore, 'games'), this.gameId);
      this.unsubList = onSnapshot(gameDocRef, (gameDoc) => {
        if (gameDoc.exists()) {
          const gameDate = gameDoc.data();
          this.game.currentPlayer = gameDate['currentPlayer'];
          this.game.playedCard = gameDate['playedCard'];
          this.game.players = gameDate['players'];
          this.game.playerImages = gameDate['playerImages'];
          this.game.stack = gameDate['stack'];
          this.game.pickCardAnimation = gameDate['pickCardAnimation'];
          this.game.currentCard = gameDate['currentCard'];
          console.log(this.game);
        } else {
          console.log('Game not found');
        }
      });
    });
  }

  updateGame() {
    let docRef = doc(collection(this.firestore, 'games'), this.gameId);
    updateDoc(docRef, this.game.toJson());
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.pickCardAnimation = true;
      let currentCard = this.game.stack.pop();      
      if (currentCard != undefined) {
        this.game.currentCard = currentCard;
      }
      this.game.currentPlayer++;
      this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
      
      this.updateGame();
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 800);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
}
