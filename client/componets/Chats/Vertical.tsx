import VerticalItem from './VerticalItem'
import ListUsers from './ListUsers'

const Vertical = () => {
    return (
        <div className="content-vertical flex-r">
            <VerticalItem groupId ={0}/>
            <VerticalItem groupId ={1}/>
            <VerticalItem groupId ={2}/>
            <ListUsers/>
        </div>
    )
}
  
export default Vertical