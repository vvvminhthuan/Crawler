import { isString } from "util"

class Rules {
    // string:'The :attribute must be a string.',
    string(value:any):boolean{
        return typeof value === 'string'
    }
    // numeric:'The :attribute must be a number.',
    numeric(value:any):boolean{
        return typeof value === 'number'
    }
    // array:'The :attribute must be an array.',
    array(value:any):boolean{
        return Array.isArray(value)
    }
    // between:'The :attribute must be between :arg0 and :arg1',
    between(value:number, arg0:number, arg1:number){
        return (value >= arg0 && value <= arg1)
    }
    // date:'The :attribute must be a valid date.',
    // dateiso:'The :attribute must be a valid ISO-8601(yyyy-mm-dd) date.',
    dateiso(value:any):boolean{
        let reg =  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
        let date = new Date(value)
        if (date&&reg.test(value)) {
            let cr = new Date()
            let offset = cr.getTimezoneOffset()
            let day = new Date(date.getTime() - (offset*60*1000)).toISOString().slice(0, 10).split('-')[2]
            return date.getDate() == parseInt(day)
        }
        return false
    }
    // email:'The :attribute must be a valid email address.',
    email(value:any):boolean{
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(value.toLowerCase())
    }
    // max:'The :attribute can not be greater than :arg0.',
    max(value:number, arg:number):boolean{
        return value <= arg
    }
    // min:'The :attribute must be at least :arg0.',
    min(value:number, arg:number):boolean{
        return value >= arg
    }
    // maxLength:'The :attribute can not be greater than :arg0.',
    maxLength(value:string|Array<any>, arg:number):boolean{
        return value.length <= arg
    }
    // minLength:'The :attribute can not be less than :arg0.',
    minLength(value:string|Array<any>, arg:number):boolean{
        return value.length >= arg
    }
    accepted:'The :attribute must be accepted.',
    acceptedIf:'The :attribute should be accepted if the parameter :arg0 is :arg1.',
    acceptedNotIf:'The :attribute can\'t be accepted if the parameter :arg0 is :arg1.',
    activeUrl:'The :attribute is not a valid url.',
    after:'The :attribute must be a date after :arg0.',
    afterOrEqual:'The :attribute must be a date after or equal :arg0.',
    alpha:'The :attribute can only contain alphabets.',
    alphaDash:'The :attribute can only contain letters, numbers, and dashes.',
    alphaNum:'The :attribute can only contain letters and numbers.',
    alphaNumeric:'The :attribute can only contain letters and numbers.',
    
    arrayUnique:'The :attribute must be an array of unique values.',
    arrayUniqueObjects:'The :attribute must be an array of unique :args attributes of object.',
    ascii:'The :attribute can only contains valid ascii characters.',
    base64:'The :attribute must be a valid base64 string.',
    before:'The :attribute must be a date before :arg0.',
    beforeOrEqual:'The :attribute must be a date before or equal to :date.',
    
    boolean:'The :attribute field must be boolean.',
    confirmed:'The :attribute confirmation does not match.',
    contains:'The :attribute must contains :arg0.',
    creditCard:'The :attribute value must be a valid card number.',
    
    dateAfter:'The :attribute must be a date after :arg0.',
    dateAfterToday:'The :attribute must be a date after :arg0 :arg1.',
    dateDaysAfterToday:'The :attribute must be a date after :arg0 days.',
    dateYearsAfterToday:'The :attribute must be a date after :arg0 years.',
    dateDaysBeforeToday:'The :attribute must be a date before :arg0 days.',
    dateYearsBeforeToday:'The :attribute must be a date before :arg0 years.',
    dateBefore:'The :attribute must be a date before :arg0.',
    dateBeforeToday:'The :attribute must be a date before :arg0 :arg1.',
    dateFormat:'The :attribute does not match the date format :arg0.',
    datetime:'The :attribute must be a valid datetime(YYYY-MM-DD HH:mm:ss).',
    
    decimal:'The :attribute must be a valid decimal value.',
    different:'The :attribute and :arg0 must be different.',
    digits:'The :attribute must be of :arg0 digits.',
    digitsBetween:'The :attribute must be between :arg0 and :arg1.',
    dimensions:'The :attribute must meet dimension constraints as :args.',
    domain:'The :attribute must be a valid domain.',
    
    equals:'The :attribute must be a equals :arg0.',
    gt:'The :attribute must be greater then :args.',
    gte:'The :attribute must be greater then or equals to :args.',
    length:'The :attribute length is not acceptable.',
    lt:'The :attribute must be less then :args',
    lte:'The :attribute must be less then or equals :args',
    hash:'The :attribute must be a valid :arg0 hash.',
    hex:'The :attribute must be a valid hex.',
    hexColor:'The :attribute must be a valid hex color.',
    in:'The selected :attribute is invalid.',
    integer:'The :attribute must be an integer.',
    ip:'The :attribute must be a valid IP address.',
    ipv4:'The :attribute must be a valid IPv4 address.',
    ipv6:'The :attribute must be a valid IPv6 address.',
    iso8601:'The :attribute must be a valid ISO8601 string.',
    json:'The :attribute must be a valid JSON string.',
    latLong:'The :attribute must be a valid comma seperated lat and long without spaces.',
    lengthBetween:'The :attribute length must be between :arg0 - :arg1.',
    macAddress:'The :attribute must be a valid mac address.',
    
   
    mime:'The :attribute must be a file of type::args.',
    
    
    mongoId:'The :attribute must be a valid mongo id.',
    notContains:'The :attribute may not contains :arg0.',
    notIn:'The selected :attribute is invalid.',
    nullable:'The :attribute is required.',
   
    object:'The :attribute must be an object.',
    phoneNumber:'The :attribute must be a valid phone number.',
    regex:'The :attribute format is invalid.',
    required:'The :attribute field is mandatory.',
    requiredIf:'The :attribute field is mandatory.',
    requiredNotIf:'The :attribute field is mandatory.',
    requiredWith:'The :attribute field is mandatory.',
    requiredWithout:'The :attribute field is mandatory.',
    same:'The :attribute and :arg0 must match.',
    size:'The :attribute must be :arg0.',
    sometimes:'The :attribute is mandatory.',
    
    timezone:'The :attribute must be a valid zone.',
    unique:'The :attribute has already been taken.',
    url:'The :attribute format is invalid.',
    any:'At least one of :attribute fields must be provided',
    niceNames:{},
    custom:{
        custom_attribute:'Message gies here.',
        'custom_attribute.rule':'Message gies here.',
    },
    default:'The :attribute value is malformed.',
}

export default Rules