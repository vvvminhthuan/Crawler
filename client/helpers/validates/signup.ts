import Joi from "joi"

const SiginUpValidates = (JOI: Joi.Root):any => {
    const isDate = (value: any, helpers): any =>{
        let originalDate = helpers.original.split('-')[2]
        if (value.getDate()!=originalDate) {
            return helpers.error()
        }
    }
    const initals = {
        firstName: JOI.string().min(1).max(250).required().label('First name'),
        lastName: JOI.string().min(1).max(250).required().label('Last name'),
        nickName: JOI.string().min(1).max(250).required().label('Last name'),
        birthDate: JOI.date().iso().required().label('Birth date')
            .less((new Date(`${(new Date().getFullYear()-18)}-${(new Date()).getMonth()}-${(new Date()).getDate()}`)))
            .error((er: any) => {
                er.forEach(item => {
                    switch (item.code) {
                        case 'date.format':
                            item.message = 'Birth date must be in (yyyy-mm-dd) date format'
                            break
                        case 'date.less':
                            item.message = 'Age must be greater than 18 age'
                            break
                        default:
                            break
                    }
                })
                return er
            })
            .custom(isDate, 'Valid date.').message('The birth date must be a valid date.'),
        gender: JOI.number().error((er: any) =>{
            console.log(er)
            er.forEach(item => {
                switch (item.code) {
                    case 'number.base':
                        item.message = 'The gender must be selected.'
                        break
                    default:
                        break
                }
            })
            return er
        }),
        email: JOI.string().email({tlds: false}).required(),
        password: JOI.string().min(6).max(32).required(),
        passwordConfirm: JOI.required().valid(JOI.ref('password')).error(new Error('passwordConfirm' )).label('Password confirm'),
        phoneNumber: JOI.number().min(10).max(12).label('Phone number'),
        numberId: JOI.number().min(9).max(12),
        address: JOI.string().required().min(1).max(250),
    }
    return initals
}

export default SiginUpValidates