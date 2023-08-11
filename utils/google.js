import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '944111541168-o2dmubhs3mlmv479nkri6u3lmjk83roi.apps.googleusercontent.com'
});

const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error) {
        return error;
    }
};

const signInSilently = async () => {
    try {
        const userInfo = await GoogleSignin.signInSilently();
        return userInfo;
    } catch (error) {
        return error;
    }
};  

const getCurrentUser = async () => {
    try {
        const currentUser = await GoogleSignin.getCurrentUser();
        return currentUser;
    } catch (error) {
        return error;
    }
};

const isSignedIn = async () => {
    try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn;
    } catch (error) {
        return error;
    }
};

const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        return true;
    } catch (error) {
        return error;
    }
};

const clearCachedAccessToken = async (accessTokenString) => {
    try {
        await GoogleSignin.clearCachedAccessToken(accessTokenString);
        return true;
    } catch (error) {
        return error;
    }
}

const getTokens = async () => {
    try {
        const getTokens = await GoogleSignin.getTokens();
        return getTokens;
    } catch (error) {
        return error;
    }
}

const revokeAccess = async () => {
    try {
        await GoogleSignin.revokeAccess();
        return true;
    } catch (error) {
        return error;
    }
};

export { signIn, signInSilently, getCurrentUser, isSignedIn, signOut, clearCachedAccessToken, getTokens, revokeAccess }