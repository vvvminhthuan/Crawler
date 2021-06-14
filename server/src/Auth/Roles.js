'user strict'

module.exports = {
    signRole: (powOf = 0, roleValidate = []) =>{
        let role = Math.pow(2, powOf)

        if (roleValidate.length > 0) {
            role = role + roleValidate.reduce((accumulator, currentValue) => accumulator + currentValue)
        }
        return role
    },
    verifyRole: (userRoles, screenRoles) =>{
        return (userRoles & screenRoles)
    }
}