import image from "../../assets/imgs/picture.jpg";
import Modal from "./Parent";
import { useChatContext } from "../../context/ChatContext";
import { useState, useRef } from "react";
import Axios from "axios";
import { BACKEND_ORIGIN } from "../../utils/constants";
import Loader from "../General/loader";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fGroupImageLink } from "../../utils/formatters";
import { CameraIcon } from "../../assets/svg";
import useChooseImage from "../../hooks/useChooseImage";
import { lsWrite } from "../../utils/localStorage-io";

export default function GroupForm({ method = "POST" }) {
  let isUpdate = method === "PATCH";

  const formRef = useRef();
  const imageBtnRef = useRef();
  const imageInputRef = useRef();
  const imagePreviewRef = useRef();

  const {
    image: { file: profileImage },
  } = useChooseImage({
    imageBtnRef,
    imageInputRef,
    imagePreviewRef,
  });

  const {
    toggleEngageChatModal,
    setRooms,
    setCurrentGroup,
    currentGroup,
    toggleShowUpdateGroupForm,
  } = useChatContext();

  const schema = yup.object().shape({
    name: yup.string().optional().max(32, "Maximum 32 characters"),
    description: yup.string().optional().max(165, "Maximum 165 characters."),
    restricted: yup.boolean(),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSendGroupData = (data) => {
    mutate({ ...data, image: profileImage });
  };

  /**@param {import("axios").AxiosResponse} */
  const handleResponse = (r) => {
    const image = fGroupImageLink(r.data.image);
    const freshGoupData = { ...r.data, image };

    if ([200, 201].includes(r.status)) {
      setCurrentGroup(freshGoupData);
      toggleEngageChatModal(false);
      reset();
    }

    switch (r.status) {
      case 201:
        // Store this group in the groups state
        // so it can be displayed in the list of groups
        setRooms((prev) => [freshGoupData, ...prev]);
        return;
      case 200:
        // Update the list of rooms
        // for the changes to be shown
        // in real time
        setRooms(
          /**@param {Array} prev */
          (prev) => {
            let idx = prev.findIndex((group) => group?.id === currentGroup.id);
            if (idx === -1) return prev;
            prev.splice(idx, 1, freshGoupData);
            return prev;
          }
        );
    }
  };

  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationKey: ["group-data"],
    mutationFn: async (groupData) => {
      /**@type {import("axios").AxiosResponse} */
      let r;

      switch (method) {
        case "POST":
          r = await Axios.post(`${BACKEND_ORIGIN}/chat-app/room/`, groupData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          handleResponse(r);
          return;

        case "PATCH":
          r = await Axios.patch(
            `${BACKEND_ORIGIN}/chat-app/room/${currentGroup?.id}/`,
            groupData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          handleResponse(r);
          return;
      }
    },
  });

  return (
    <Modal
      title={isUpdate ? "Editer groupe" : "Nouveau groupe"}
      onClose={() => {
        isUpdate
          ? toggleShowUpdateGroupForm(false)
          : toggleEngageChatModal(false);
      }}
    >
      <form
        method={`${isUpdate ? "PATCH" : "POST"}`}
        onSubmit={handleSubmit(handleSendGroupData)}
        className="box-in-modal-card"
        ref={formRef}
      >
        {isUpdate && currentGroup.restricted && (
          <span className="cell-red">Restreint</span>
        )}
        <div className="wrap-input">
          <label htmlFor="name">Nom du groupe</label>
          <input
            type="text"
            name="name"
            placeholder="A secret name"
            defaultValue={isUpdate ? currentGroup?.name : undefined}
            {...register("name", { maxLength: 32, required: false })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="wrap-input">
          <label htmlFor="description">Description du groupe</label>
          <input
            type="text"
            name="description"
            placeholder="A secret description"
            defaultValue={isUpdate ? currentGroup?.description : undefined}
            {...register("description", { maxLength: 165, required: false })}
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
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
            <img
              ref={imagePreviewRef}
              src={
                isUpdate && currentGroup?.image
                  ? currentGroup?.image
                  : image
              }
              alt={`Profile image of [ ${currentGroup?.name} this ] group`}
            />
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

        <div className="wrap-checks">
          <input
            type="checkbox"
            name="restricted"
            id="restricted"
            {...register("restricted", { required: false })}
          />
          <label htmlFor="restricted">
            <span style={{ marginRight: ".5rem" }}>
              Vous seul(e) gérez ce groupe
            </span>
          </label>
        </div>

        <button type="submit" className="modal-final-action-btn exclude-button">
          {isPending ? <Loader height={20} width={20} /> : "Créer"}
        </button>
      </form>
    </Modal>
  );
}
