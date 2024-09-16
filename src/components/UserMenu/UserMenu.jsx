import { useSelector } from "react-redux"
import { selectUser } from "../../redux/auth/selectors";


const UserMenu = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default UserMenu