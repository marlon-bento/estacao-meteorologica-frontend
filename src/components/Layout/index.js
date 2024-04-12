import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../MainHeader';

import {Outlet, useLocation, useNavigate, userEffct} from 'react-router-dom';
import './style.css'
function Layout(prop){
    const {state} = useLocation();
    const navigate = useNavigate();

    return(
        <div className='posicao'>
            

            <Aside/>
            <MainHeader page={"string"}/>
            <Content page={<Outlet />} />
            
            
            
        </div>
    );
}
export default Layout;