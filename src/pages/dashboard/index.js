import Aside from '../../components/Aside';
import Content from '../../components/Content';
import MainHeader from '../../components/MainHeader';
import {Outlet, useLocation, useNavigate, userEffct} from 'react-router-dom';
import './style.css'

function Dashboard (){
    return(
       
         <div className='posicao'>
            
            <Aside/>
            <MainHeader page={"string"}/>
            <div className='dashboard'>
                h1
            </div>
            
            
            
        </div>
        
    );
}
export default Dashboard;