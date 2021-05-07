import userTypes from'./user.types';
import { auth, handleUserProfile, GoogleProvider } from './../../firebase/utils';


export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload:user
});

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS

})

export const signInUser = ({email, password}) =>  async dispatch =>{

    try {

        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    
    } catch (err) {
        // console.log(err);
    }
};

export const signUpUser = ({ displayName, companyName, phoneNo, email, password, confirmPassword, errors }) => async dispatch =>{
    if (password !== confirmPassword) {
        const err = ['Password Don\'t match.'];
        dispatch({
            type:userTypes.SIGN_UP_ERROR,
            payload:err
        });
        return;
    }
    if (password.length < 7) {
        const err = ['Password length should be at least 7 characters long.'];
        dispatch({
            type:userTypes.SIGN_UP_ERROR,
            payload:err
        });
        return;
    }

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName, companyName, phoneNo });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload:true
        });

    } catch (err) {
        var err_msg = [err.message];
        dispatch({
            type:userTypes.SIGN_UP_ERROR,
            payload:err_msg
        });
        //  console.log(err.message);
    }
};

export const resetPassword = ({ email }) => async dispatch =>{

    const config = {
        url: 'http://localhost:3000/login'
    };

    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type:userTypes.RESET_PASSWORD_SUCCESS,
                    payload:true
                });
                // props.history.push('/login');
                // console.log('Password Reset');
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                dispatch({
                    type:userTypes.RESET_PASSWORD_ERROR,
                    payload:err
                });
            });


    } catch (err) {
        var errlog = [err];
        dispatch({
            type:userTypes.RESET_PASSWORD_ERROR,
            payload:errlog
        });
        //   console.log(err);
    };

};

export const signInwithGoogle = () => async dispatch =>{

    try{
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: true
                });
            });
    } catch (err){
        //console.log(err);
    }

};


