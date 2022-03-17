import NavTop from '../NavTop';
const Header = ({showAside, setShowAside}) => {
    return (
        <>  
            <NavTop showAside={showAside} setShowAside={setShowAside}/>
        </>
    )
}
  
export default Header