export const SiginUpValidates = {
    firstName: 'required|string|maxLength:255',
    lastName: 'required|string|maxLength:255',
    nickName: 'required|string|maxLength:255',
    birthDate: {
        required: true,
        isDate: (value) => {
            let reg =  new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')
            if (!reg.test(value)) {
                return false
            }
            let d = value.split('-')[2]
            let dateCur = new Date(value)
            if (dateCur.getDate()!= d) {
                return false
            }
            return true
        }
    },
    gender: 'required|string|maxLength:255',
    email: 'required|string|maxLength:255',
    password: 'required|string|minLength:6',
    passwordConfirm: {
        required: true,
        string: true,
        pwConfirm: (value) => {
            let password:any = document.getElementsByName('password')
            if (value == password[0].value) {
                return true
            }
            return false
        }
    },
    phoneNumber: 'required|string|phoneNumber',
    numberId: {
        required:true,
        numeric:true,
        minLength: 9,
        maxLength:12
    },
    address: 'required|string|maxLength:255',
}

export const SigninUpMessage = {
    // firstName: {
    //     required: 'First name is required.',
    //     string: 'First name is string.',
    //     max: 'First name must be max 255 charater.'
    // },
    // lastName: {
    //     required: 'Last name is required.',
    //     string: 'Last name is string.',
    //     max: 'Last name must be max 255 charater.'
    // },
    // nickName: {
    //     required: 'Nick name is required.',
    //     string: 'Nick name is string.',
    //     max: 'Nick name must be max 255 charater.'
    // },
    birthDate: {
        isDate: 'The birth date must be format yyyy-mm-dd.'
    },
    passwordConfirm: {
        pwConfirm: 'The password confirm must be same password.'
    },
    // gender: '',
    // email: '',
    // password: '',
    // passwordConfirm: '',
    // phoneNumber: '',
    // numberId: '',
    // address: '',
}