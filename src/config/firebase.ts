import * as auth from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCIKWmky0vM3B0SF91g0CJj-hs9P6WvdM8',
  authDomain: 'learning-firebase-ef824.firebaseapp.com',
  projectId: 'learning-firebase-ef824',
};

const app = initializeApp(firebaseConfig);

const firebaseAuth = auth.getAuth(app);

const githubInstace = new auth.GithubAuthProvider();
const googleInstace = new auth.GoogleAuthProvider();

const providers = {
  github: {
    instace_provider: githubInstace,
    provider: auth.GithubAuthProvider
  },
  google: {
    instace_provider: googleInstace,
    provider: auth.GoogleAuthProvider
  }
}

export {
  firebaseAuth,
  firebaseConfig,
  providers,
}