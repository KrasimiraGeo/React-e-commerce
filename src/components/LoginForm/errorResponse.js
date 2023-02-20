export const errorResponse = (data) => {

    let errorMessage = ''

    switch (data.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = '* This email already exists'
            break;

        case 'INVALID_PASSWORD':
            errorMessage = '* Your credentials are incorrect'
            break;
            
        case 'EMAIL_NOT_FOUND':
            errorMessage = '* Your email is incorrect'
            break;

        default:
            errorMessage = '* Something went wrong'
            break;
    }

    return errorMessage
}