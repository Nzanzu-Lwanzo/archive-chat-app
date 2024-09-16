import { useEffect, useState } from "react";

export default function useChooseImage({
  imageBtnRef,
  imageInputRef,
  imagePreviewRef,
}) {

  const [image, setImage] = useState({
    extension: "",
    size: 0,
    file: undefined,
  });

  useEffect(() => {
    /**@type {HTMLButtonElement} */
    const imageBtn = imageBtnRef.current;

    /**@type {HTMLInputElement} */
    const imageInput = imageInputRef.current;

    /**@type {HTMLImageElement} */
    const imagePreview = imagePreviewRef.current;

    const clickOnInput = () => imageInput.click();

    /**@param {InputEvent} e */
    const selectAndDisplayImage = (e) => {
      /**@type {File} */
      const image = e.target.files[0];

      setImage({
        extension: image.name.split(".").at(-1),
        size: image.size,
        file: image,
      });

      if (image) {
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () =>
          imagePreview.setAttribute("src", fileReader.result)
        );

        fileReader.readAsDataURL(image);
        
      }
    };

    imageBtn.addEventListener("click", clickOnInput);
    imageInput.addEventListener("change", selectAndDisplayImage);

    return () => {
      imageBtn.removeEventListener("click", clickOnInput);
      imageInput.removeEventListener("change", selectAndDisplayImage);
    };
  }, []);

  
  return {image}
}
