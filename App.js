// import React from 'react';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import * as firebase from 'firebase';
// import { Input } from './components/Input';
// import { Button } from './components/Button';

// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

// export default class App extends React.Component {
//   state = {
//     email: '',
//     password: '',
//     authenticating: false,
//     user: null,
//     error: '',
//     isSigninInProgress: false,
//   }

//   componentWillMount() {
//     const firebaseConfig = {
//       apiKey: "AIzaSyAxbz3FOJZotZddawNWKZ-MmXNzNlEDxyI",
//       authDomain: "lunch-d218c.firebaseapp.com",
//       databaseURL: "https://lunch-d218c.firebaseio.com",
//       projectId: "lunch-d218c",
//       storageBucket: "lunch-d218c.appspot.com",
//       messagingSenderId: "203520280330"
//     }

//     firebase.initializeApp(firebaseConfig);
//   }

//   onPressSignIn() {
//     this.setState({
//       authenticating: true,
//     });

//     const { email, password } = this.state;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(user => this.setState({
//         authenticating: false,
//         user,
//         error: '',
//       }))
//       .catch(() => {
//         // Login was not successful
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//           .then(user => this.setState({
//             authenticating: false,
//             user,
//             error: '',
//           }))
//           .catch(() => this.setState({
//             authenticating: false,
//             user: null,
//             error: 'Authentication Failure',
//           }))
//       })
//   }

//   onPressLogOut() {
//     firebase.auth().signOut()
//       .then(() => {
//         this.setState({
//           email: '',
//           password: '',
//           authenticating: false,
//           user: null,
//         })
//       }, error => {
//         console.error('Sign Out Error', error);
//       });
//   }

//   renderCurrentState() {
//     if (this.state.authenticating) {
//       return (
//         <View style={styles.form}>
//           <ActivityIndicator size='large' />
//         </View>
//       )
//     }

//     if (this.state.user !== null) {
//       return (
//         <View style={styles.form}>
//           <Text>Logged In</Text>
//           <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
//         </View>
//       )
//     }

//     return (
//       <View style={styles.form}>
//         <Input
//           placeholder='Enter your email...'
//           label='Email'
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <Input
//           placeholder='Enter your password...'
//           label='Password'
//           secureTextEntry
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button onPress={() => this.onPressSignIn()}>Log In</Button>
//         <Text>{this.state.error}</Text>
//         <GoogleSigninButton
//             style={{ width: 200, height: 48, alignSelf: "center" }}
//             size={GoogleSigninButton.Size.Wide}
//             color={GoogleSigninButton.Color.Light}
//             onPress={this._signIn}
//             disabled={this.state.isSigninInProgress} />
//       </View>
//     )

//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.renderCurrentState()}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
//   form: {
//     flex: 1,
//   }
// });




// //Google Login
// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, Text, View, Alert, Button } from 'react-native';
// import firebase from "firebase";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
// // import config from './config'; // you need to create this file yourself!

// export default class Lunch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userInfo: null,
//       error: null,
//     };
//   }

//   componentWillMount() {
//     const firebaseConfig = {
//       apiKey: "AIzaSyAxbz3FOJZotZddawNWKZ-MmXNzNlEDxyI",
//       authDomain: "lunch-d218c.firebaseapp.com",
//       databaseURL: "https://lunch-d218c.firebaseio.com",
//       projectId: "lunch-d218c",
//       storageBucket: "lunch-d218c.appspot.com",
//       messagingSenderId: "203520280330"
//     }

//     firebase.initializeApp(firebaseConfig);
//   }

//   async componentDidMount() {
//     this._configureGoogleSignIn();
//     await this._getCurrentUser();
//   }

//   _configureGoogleSignIn() {
//     GoogleSignin.configure({
//       webClientId: "203520280330-ak14r08egeas4kjk2b37jj96ijdlhodl.apps.googleusercontent.com",
//       offlineAccess: false,
//     });
//   }

//   async _getCurrentUser() {
//     try {
//       const userInfo = await GoogleSignin.signInSilently();
//       this.setState({ userInfo, error: null });
//     } catch (error) {
//       const errorMessage =
//         error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
//       this.setState({
//         error: errorMessage,
//       });
//     }
//   }

//   render() {
//     const { userInfo } = this.state;

//     const body = userInfo ? this.renderUserInfo() : this.renderSignInButton();
//     return (
//       <View style={[styles.container, { flex: 1 }]}>
//         {this.renderIsSignedIn()}
//         {body}
//       </View>
//     );
//   }

//   renderIsSignedIn() {
//     return (
//       <Button
//         onPress={async () => {
//           const isSignedIn = await GoogleSignin.isSignedIn();
//           Alert.alert(String(isSignedIn));
//         }}
//         title="is user signed in?"
//       />
//     );
//   }

//   renderUserInfo() {
//     const { userInfo } = this.state;

//     return (
//       <View style={styles.container}>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
//           Welcome {userInfo.user.name}
//         </Text>
//         <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

//         <Button onPress={this._signOut} title="Log out" />
//         {this.renderError()}
//       </View>
//     );
//   }

//   renderSignInButton() {
//     return (
//       <View style={styles.container}>
//         <GoogleSigninButton
//           style={{ width: 212, height: 48 }}
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Auto}
//           onPress={this._signIn}
//         />
//         {this.renderError()}
//       </View>
//     );
//   }

//   renderError() {
//     const { error } = this.state;
//     if (!error) {
//       return null;
//     }
//     const text = `${error.toString()} ${error.code ? error.code : ''}`;
//     return <Text>{text}</Text>;
//   }

//   _signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       GoogleSignin
//       .signIn()
//       .then((data) => {
//         const credendial = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

//         firebase.auth().signInWithCredential(credendial);
//         console.log(data);
//         this.setState({ userInfo: data, error: null });
//       });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // sign in was cancelled
//         Alert.alert('cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation in progress already
//         Alert.alert('in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         Alert.alert('play services not available or outdated');
//       } else {
//         Alert.alert('Something went wrong', error.toString());
//         this.setState({
//           error,
//         });
//       }
//     }
//   };

//   _signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();

//       this.setState({ userInfo: null, error: null });
//     } catch (error) {
//       this.setState({
//         error,
//       });
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });





import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert, Button } from 'react-native';
import firebase from "firebase";
import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Lunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyAxbz3FOJZotZddawNWKZ-MmXNzNlEDxyI",
      authDomain: "lunch-d218c.firebaseapp.com",
      databaseURL: "https://lunch-d218c.firebaseio.com",
      projectId: "lunch-d218c",
      storageBucket: "lunch-d218c.appspot.com",
      messagingSenderId: "203520280330"
    }

    firebase.initializeApp(firebaseConfig);
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: "203520280330-ak14r08egeas4kjk2b37jj96ijdlhodl.apps.googleusercontent.com",
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: errorMessage,
      });
    }
  }

  render() {
    const { userInfo } = this.state;

    const body = userInfo ? this.renderUserInfo() : this.renderSignInButton();
    return (
      <View style={[styles.container, { flex: 1 }]}>
        {this.renderIsSignedIn()}
        {body}
      </View>
    );
  }

  renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          var isSignedIn = false
          var token = await AccessToken.getCurrentAccessToken();
          if (token != null){
            isSignedIn = true
          }
          console.log(token)
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  renderUserInfo() {
    const { userInfo } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Welcome {userInfo.user.name}
        </Text>
        {/* <Text>Your user info: {JSON.stringify(userInfo.user)}</Text> */}

        <Button onPress={this._signOut} title="Log out" />
        {this.renderError()}
      </View>
    );
  }

  renderSignInButton() {
    return (
      <View style={styles.container}>
      <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    return firebase.auth().signInWithCredential(credential);
                  }
                ).then((currentUser) => {
                  console.log(currentUser);
                  currentUser.name = currentUser.displayName
                  const userInfo = {user: currentUser}
                  this.setState({ userInfo: userInfo, error: null });
                })
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
        {this.renderError()}
      </View>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin
      .signIn()
      .then((data) => {
        const credendial = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

        firebase.auth().signInWithCredential(credendial);
        console.log(data);
        this.setState({ userInfo: data, error: null });
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});