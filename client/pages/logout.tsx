import Layout from 'componets/Layouts'

import { useEffect } from 'react'

import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'redux/actions/SignIn'
import { getInfoUser } from 'redux/middleware/User'
import {apiSignOut} from 'api/Auth'
import { useRouter } from 'next/router'

const LogoutPage = ({signIn, action}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        apiSignOut()
        .then((result) => {
            if (result.success) {
                dispatch(getInfoUser())
                router.push('./login')
            }
        }).catch((err) => {
            console.log(err + '')
        })
    }, [])
    return (
        <Layout title='Trang Chủ' description='Hoàng Minh Thuận'>
		</Layout>
    )
}



function mapStateToProps(state) {
    return {
        signIn: state.signIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({signOut}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)