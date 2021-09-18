import { useHistory } from "react-router"

const AdminReloadComp = () => {
    const history = useHistory()
    history.push('/adminprofile')
    return <div></div>
}

export default AdminReloadComp