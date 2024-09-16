import { XCircleIcon } from "../../assets/svg";
import Loader from "../General/loader";
import Search from "../General/Search";

export default function Modal({ children, onFinalAction, title, onClose, moreInHeader }) {
  let isPending = onFinalAction?.isPending;

  return (
    <div className="modal-page center">
      <div className="modal-card custom-scrollbar">
        <div className="modal-header">
          <h2>{title}</h2>
          <div className="icons-n-more">
            {moreInHeader}
            <button className="close-modal center" onClick={onClose}>
              <XCircleIcon />
            </button>
          </div>
        </div>

        {children}

        {onFinalAction !== undefined && (
          <button
            type="button"
            className="modal-final-action-btn exclude-button"
            onClick={onFinalAction.fn}
          >
            {isPending ? <Loader height={20} width={20} /> : onFinalAction.btn}
          </button>
        )}
      </div>
    </div>
  );
}
