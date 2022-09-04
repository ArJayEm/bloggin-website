import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";

const AuthContext = React.createContext("defaultValue");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  async function updateName(newValue) {
    var editedDate = Date.now();
    var doc = firestore.collection("users").doc(currentUser.uid);
    var updated = await doc
      .update({
        displayName: newValue,
        editedDate: editedDate,
      })
      .then(() => {
        // var insert = doc.get().then((snapshot) => {
        //   var oldValue = snapshot.get("name");
        //   insertHistory("name", oldValue, newValue, editedDate);
        // });
        return true;
      })
      .catch(() => {
        //return false;
      });
    return updated;
  }

  // async function insertHistory(field, oldValue, newValue, editedDate) {
  //   var history = firestore.collection("history").doc();
  //   var inserted = await history
  //     .set({
  //       field: field,
  //       oldValue: oldValue,
  //       newValue: newValue,
  //       editedDate: editedDate,
  //     })
  //     .then(() => {
  //       return true;
  //     })
  //     .onError(() => {
  //       return false;
  //     });
  //   return inserted;
  // }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(Object.assign(user));
      }
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
