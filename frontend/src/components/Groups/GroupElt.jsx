import image from "../../assets/imgs/picture.jpg";
import { useChatContext } from "../../context/ChatContext";

export default function GroupElt ({isCurrentGroup,group,selectGroup}) {

    const {setShowConvAndGroupsBarOnMobile} = useChatContext();
    
    return (
        <li 
            draggable="false"
            className={isCurrentGroup ? "current-chat" : undefined}
            onClick={()=>{
                selectGroup();
                setShowConvAndGroupsBarOnMobile(false);
            }}>

            <div className="user">
                <div className="img-wrapper">
                    <img src={group.image || image} alt="Image" />
                </div>
                <span>{group.name}</span>
            </div>

        </li>
    )
}