// import { Injectable, inject } from '@angular/core';
// import { GameFace } from '../interface/game.interface';
// import {
//   Firestore,
//   doc,
//   collection,
//   onSnapshot,
//   addDoc,
//   query,
//   where
// } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class GameService {
//   game: GameFace[] = [];
//   gameID: string = '';
//   unsubGame;

//   firestore: Firestore = inject(Firestore);

//   constructor() {
//     this.unsubGame = this.subGameList();
//   }

//   setGameID(id: string) {
//     this.gameID = id;
//   }

//   async updateNote(note: Note) {
//     if (note.id) {
//       let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
//       await updateDoc(docRef, this.getCleanJson(note))
//         .catch((err) => {
//           console.error(err);
//         })
//         .then();
//     }
//   }

//   subGameList() {
//     const q = query(this.getGameRef(), where("id", "==", this.gameID));
//     return onSnapshot(q, (list) => {
//       this.game = [];
//       list.forEach((element) => {
//         this.game.push(this.setGameObject(element.data(), element.id));
//         console.log(this.setGameObject(element.data(), element.id))
//       });
//     });
//   }

//   async addGame(item: GameFace) {
//     await addDoc(this.getGameRef(), item)
//       .catch((err) => {
//         console.error(err);
//       })
//       .then((docRef) => {
//         console.log('Document written with ID: ', docRef?.id);
//       });
//   }

//   ngonDestroy() {
//     this.unsubGame();
//   }

//   setGameObject(obj: any, id: string): GameFace {
//     return {
//       id: id,
//       currentPlayer: obj.currentPlayer || 0,
//       playedCard: obj.playedCard || [],
//       players: obj.players || [],
//       stack: obj.stack || [],
//     };
//   }

//   getGameRef() {
//     return collection(this.firestore, 'games');
//   }

//   getSingleDocRef(colId: string, docId: string) {
//     return doc(collection(this.firestore, colId), docId);
//   }
// }
