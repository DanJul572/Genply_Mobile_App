import { Alert } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const signIn = async () => {    
    return await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    .then(async appleAuthRequestResponse => {
        return await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
        .then(credentialState => {
            if (credentialState === appleAuth.State.AUTHORIZED) {
                let response = appleAuthRequestResponse;
                let give_credential = false;
                (response.email == null) ? give_credential = true : give_credential = false;
                return {
                    give_credential: give_credential,
                    apple_id: response.user,
                    email: response.email,
                    given_name: response.fullName.givenName,
                    family_name: response.fullName.familyName
                }
            }
        })
        .catch(() => {
            Alert.alert('Error', 'Failed to get credential');
        });
    })
    .catch(() => {
        Alert.alert('Error', 'Failed to get response');
    });
}

export { signIn }