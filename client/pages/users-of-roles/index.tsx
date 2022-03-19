import Layout from 'components/Layouts'
import TableWidgets from 'components/Widgets/TableWidgets'

const UsersOfRoles = () => {
    return (
        <Layout title='Users of roles' description='Trang phan quyen nguoi dung'>
			<div className="page-role flex-c">
                <div className="role-header flex-r">
                    <div className="title">
                        <h1>Roles</h1>
                    </div>
                    <div className="action">
                        <button>Create New</button>
                    </div>
                </div>
                <div className="role-containers flex-r">
                    <div className="form-create">
                        form create role
                    </div>
                    <div className="list-role">
                        list roles
                    </div>
                </div>
            </div>
		</Layout>
    )
}
  
export default UsersOfRoles