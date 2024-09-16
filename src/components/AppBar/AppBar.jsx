import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"

import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";

const AppBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
        {isLoggedIn ? <Navigation /> : <AuthNav />}
    </header>
  )
}



export default AppBar



