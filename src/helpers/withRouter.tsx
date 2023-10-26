import {NavigateFunction, useNavigate} from "react-router-dom";


export interface RouteComponentProps {
    navigate: NavigateFunction
}


export const withRouter = (Component:any) => {
    const Wrapper = (props:any) => {
        const navigate = useNavigate()
        return <Component navigate={navigate} {...props} />
    };
    return Wrapper
}
