export const SiginUpValidates = {
    firstName: 'required|string|max:255',
    lastName: 'required|string|max:255',
    nickName: 'required|string|max:255',
    birthDate: {
        required: true,
        isDate: (value) => {
            let reg =  new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')
            if (!reg.test(value)) {
                return 'The birth date must be format yyyy-mm-dd.'
            }
            let d = value.split('-')[2]
            let dateCur = new Date(value)
            if (dateCur.getDate()!= d) {
                return 'The birth date must be date.'
            }
            return true
        }
    },
    gender: 'required|string|max:255',
    email: 'required|string|max:255',
    password: 'required|string|min:6',
    passwordConfirm: {
        required: true,
        string: true,
        pwConfirm: (value) => {
            let password:any = document.getElementsByName('password')
            if (value == password[0].value) {
                return true
            }
            return 'Password confirm must be same password.'
        }
    },
    phoneNumber: 'required|string|min:9|max:11',
    numberId: 'required|numeric|min:9|max:12',
    address: 'required|string|max:255',
}

export const SigninUpMessage = {
    firstName: {
        required: 'First name is required.',
        string: 'First name is string.',
        max: 'First name must be max 255 charater.'
    },
    lastName: {
        required: 'Last name is required.',
        string: 'Last name is string.',
        max: 'Last name must be max 255 charater.'
    },
    nickName: {
        required: 'Nick name is required.',
        string: 'Nick name is string.',
        max: 'Nick name must be max 255 charater.'
    },
    // birthDate: '',
    // gender: '',
    // email: '',
    // password: '',
    // passwordConfirm: '',
    // phoneNumber: '',
    // numberId: '',
    // address: '',
}