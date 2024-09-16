import image from "../../assets/imgs/picture.jpg";
import { CameraIcon } from "../../assets/svg";
import { useRef } from "react";
import { useChatContext } from "../../context/ChatContext";
import useValidateAuthData from "../../hooks/useValidateAuthData";
import Axios from "axios";
import useEditUserProfile from "../../hooks/useEditUserProfile";
import Loader from "../General/loader";
import useChooseImage from "../../hooks/useChooseImage";
import Modal from "./Parent";

export default function EditProfile() {

  const { toggleShowEditProfileCard } = useChatContext();
  const { mutate, isSuccess, isError, isPending } = useEditUserProfile();
  const formRef = useRef();

  const imageBtnRef = useRef();
  const imageInputRef = useRef();
  const imagePreviewRef = useRef();
  const { user } = useChatContext();

  const { errors, handleSubmit, register, reset } = useValidateAuthData();
  const {
    image: { file: profileImage },
  } = useChooseImage({ imageBtnRef, imageInputRef, imagePreviewRef });

  const sendEditProfileData = (data) => {
    // SEND THE DATA (show a toast message if there's an error, see the README)

    const formData = new FormData(formRef.current);
    mutate(formData);
  };

  return (
    <Modal
      title="Profile"
      onClose={()=>toggleShowEditProfileCard(false)}      
    >
      <form
        ref={formRef}
        className="box-in-modal-card"
        onSubmit={handleSubmit(sendEditProfileData)}
      >
        <div className="wrap-input">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={user.name}
            placeholder="ex : John Doe"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 16,
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="wrap-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            placeholder="ex : johndoe@gmail.com"
            {...register("email", { required: false })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="wrap-input">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="text"
            name="password"
            placeholder="A secret password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="edit-image">
          <input
            ref={imageInputRef}
            type="file"
            name="image"
            id="image"
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg"
          />

          <div className="image-container">
            <img ref={imagePreviewRef} src={user.image || image} alt="" />
          </div>

          <div className="details-n-action">
            <button
              type="button"
              ref={imageBtnRef}
              className="center exclude-button"
            >
              <CameraIcon />
            </button>
          </div>
        </div>

        <button type="submit" className="modal-final-action-btn exclude-button">
          {isPending ? <Loader height={20} width={20} /> : "Editer profile"}
        </button>
      </form>
    </Modal>
  );
}
