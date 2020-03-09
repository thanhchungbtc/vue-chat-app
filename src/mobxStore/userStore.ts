import {action, observable} from "mobx";
import {User} from "@/services/interfaces";
import firebase, {firestore} from "firebase";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;
import remotedev from 'mobx-remotedev';

@remotedev
export class UserStore {
  @observable activeUsers: User[] = []
  @observable partners: User[] = []

  @action
  loadActiveUsers() {
    firestore()
      .collection('users')
      .onSnapshot((snapshot) => {
        this.activeUsers = this.snapShotToUsers(snapshot)
      })
  }

  @action
  loadPartners(user: User) {
    firestore()
      .collection('users')
      .doc(user.id)
      .collection('partners')
      .onSnapshot((snapshot) => {
        this.partners = this.snapShotToUsers(snapshot)
      })
  }


  private snapShotToUsers(snapshot: QuerySnapshot<DocumentData>) {
    const arr: User[] = []
    snapshot.forEach((doc) => {
      const u = new User()
      u.id = doc.id
      u.email = doc.data().email
      arr.push(u)
    })

    return arr;
  }


}