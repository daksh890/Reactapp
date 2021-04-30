import { UseAuth } from './../customHooks';
import { withRouter } from 'react-router-dom';


const withAuth = props => UseAuth(props) && props.children;

export default withRouter(withAuth);