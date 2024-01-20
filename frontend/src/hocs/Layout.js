import {Navbar} from "../components/Navbar";

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserAuthenticated, loadUser} from "../actions/auth";

const Layout = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUserAuthenticated())
        dispatch(loadUser())
    }, [])

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}

export default Layout