import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null);
  user : Observable<User[]>;

  constructor(private db: AngularFirestore,private afAuth: AngularFireAuth, private router: Router) { }

  getUserData(username: String){
    this.user = this.db.collection<User>('users',ref=> {
      return ref.where('username','==',username)
    }).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const uid = a.payload.doc.id;
        return { uid, ...data};
      });
    }));
    return this.user;
  }

  loginSuccess(user: User){
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/flights']);
  }

  autoLogin(){
    const userData=JSON.parse(localStorage.getItem('currentUser'));
    if (!userData) {
      return;
    }
    else{
      this.userSubject.next(userData);
    }
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/']);
}

async SocialSignin(media:String) {
  let provider=null;
  if(media=='Google'){
    provider = new auth.GoogleAuthProvider();
  }
  return await this.afAuth.auth.signInWithPopup(provider);
  //return this.updateUserData(credential.user);
}

updateUserData(user) {
  const userRef: AngularFirestoreDocument<User> = this.db.doc('users/'+user.uid);

  const data = {
    uid: user.uid,
    username: null,
    password: null,
    role: 'Admin',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  };

  userRef.set(data, { merge: true });
  this.loginSuccess(data);
  return data;

}
}
