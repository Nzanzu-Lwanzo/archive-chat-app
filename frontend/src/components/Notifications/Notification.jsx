import { XIcon } from "../../assets/svg"

export default function Notification ({msg,action}) {
    return (
        <li className="cell notification-cell">
            <span>
                {msg}
            </span>
            <span className="center delete-notif">
                <XIcon />
            </span>
        </li>
    )
}