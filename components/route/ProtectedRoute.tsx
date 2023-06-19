import { Redirect, Route } from "react-router-dom";
import { checkLoggedIn } from "../../services/auth.service";

/*
type props = {
    acceptedRole: string;
    destination: any;
}
*/

function ProtectedRoute(props: any) {

    const acceptedRole = props.role;
    //const destination = props.path;

    if (checkLoggedIn(acceptedRole)) {
        return (
            <Route {...props} />
        );
    }

    return (
        <Redirect to={"/"} />
    );
}

export default ProtectedRoute;