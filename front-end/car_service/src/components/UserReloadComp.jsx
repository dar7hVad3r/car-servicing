import { useHistory, useLocation } from "react-router"

const UserReload = () => {
    const history = useHistory()
    const location = useLocation()
    history.push('/userprofile', location.state)
    return <div></div>
}

export default UserReload