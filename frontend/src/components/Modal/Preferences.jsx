import { useState } from "react";
import { lsRead, lsWrite } from "../../utils/localStorage-io";
import Loader from "../General/loader";

export default function Preferences() {
  const preferencesDefaultState = lsRead("preferences", {
    "sound-on-new-message": true,
    "notifications-pop-up": true,
    "periodical-refresh": true,
  });

  const [preferences, setPreferences] = useState(preferencesDefaultState);
  const [saving, setSaving] = useState(false);

  return (
    <div className="box-in-modal-card">
      <h3>Preferences</h3>
      <div className="wrap-checks">
        <input
          type="checkbox"
          name="sound-on-new-message"
          id="sound-on-new-message"
          checked={preferences["sound-on-new-message"]}
          onChange={(e) =>
            setPreferences((prev) => {
              return { ...prev, "sound-on-new-message": e.target.checked };
            })
          }
        />

        <label htmlFor="sound-on-new-message">
          Jouer un son à la réception d'un message
        </label>
      </div>

      <div className="wrap-checks">
        <input
          type="checkbox"
          name="notifications-pop-up"
          id="notifications-pop-up"
          checked={preferences["notifications-pop-up"]}
          onChange={(e) =>
            setPreferences((prev) => {
              return { ...prev, "notifications-pop-up": e.target.checked };
            })
          }
        />
        <label htmlFor="notifications-pop-up">
          Montrer des notifications à la réception d'un message
        </label>
      </div>

      <div className="wrap-checks">
        <input
          type="checkbox"
          name="periodical-refresh"
          id="periodical-refresh"
          checked={preferences["periodical-refresh"]}
          onChange={(e) =>
            setPreferences((prev) => {
              return { ...prev, "periodical-refresh": e.target.checked };
            })
          }
        />
        <label htmlFor="periodical-refresh">
         Rafraichir ma page périodiquement
        </label>
      </div>

      <button
        type="button"
        className="modal-final-action-btn exclude-button"
        onClick={() => {
          setSaving(true);

          setTimeout(() => {
            lsWrite(["preferences", preferences]);
            setSaving(false);
          }, 800);
        }}
      >
        {saving ? <Loader height={20} width={20} /> : "Save changes"}
      </button>
    </div>
  );
}
