'user strict'

module.exports = {
    signRole: (powOf = 0, roleChild = []) =>{
        let role = Math.pow(2, powOf)

        if (roleChild.length > 0) {
            role = role + roleChild.reduce((accumulator, currentValue) => accumulator + currentValue)
        }
        return role 
    },
    signRoleChild: (roleChild = []) =>{
        let role = 0

        if (roleChild.length > 0) {
            role = roleChild.reduce((accumulator, currentValue) => accumulator + currentValue)
        }
        return role
    },

    renderRole: (oldRoleChild = 0, newRoleChild = []) =>{
        let newRole = 0

        if (newRoleChild.length > 0) {
            newRole = newRoleChild.reduce((accumulator, currentValue) => accumulator + currentValue)
        }
        return (newRole - oldRoleChild)
    },
    verifyRole: (userRoles, screenRoles) =>{
        return (userRoles & screenRoles)
    }
}