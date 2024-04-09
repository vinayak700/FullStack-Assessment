import multer from "multer";

const storageConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const name = Date.now() + file.originalname;
    cb(null, name);
  },
});

export const upload = multer({
  storage: storageConfig,
});
