import multer from "multer";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const filesDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/"
);

/**
 *
 * @param {string} dir
 */
export const getFileStorage = (dir) => {
  return multer.diskStorage({
    destination: join(filesDir, dir),
    filename:
      /**
       *
       * @param {import("express").Request} request
       * @param {import("express").Response} response
       * @param {Function}
       */
      (request, file, fn) => {
        // Request
        // Multer.File
        // fn(Error,filename)

        fn(
          null,
          `${Date.now()}-${file.fieldname}${extname(file.originalname)}`
        );
      },
  });
};

/**
 *
 * @param {} fileStorage
 * @param {string} fieldname
 * @returns {multer}
 */
export const getFileUploader = (fileStorage, fieldname) => {
  return multer({
    storage: fileStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2Mo / image : not more
    fileFilter(req, file, callback) {
      const validExtension =
        [".png", ".jpg", ".jpeg"].indexOf(
          extname(file.originalname).toLowerCase()
        ) >= 0;

      const validMimeType =
        ["image/png", "image/jpg", "image/jpeg"].indexOf(file.mimetype) >= 0;

      if (validExtension && validMimeType) {
        return callback(null, true);
      }

      callback(new Error("Invalid file extension of mimetype."));
    },
  }).single(fieldname || "image");
};

const handleSingleUploadFile = async (req, res) => {
  return new Promise((resolve, reject) => {
    getFileUploader(req, res, (error) => {
      if (error) {
        reject(error);
      }

      resolve({ file: req.file, body: req.body });
    });
  });
};

// Instead of using a middleware,
// just use this function inside of the controller
// ex :
// const {file,body} = await handleSingleUploadFile(req,res)
