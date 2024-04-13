import './style.css'
function MainHeader({page}){
    return(
        <div className='mainHeader'>
            <h1>{page}</h1>
        </div>
    );
}
export default MainHeader;