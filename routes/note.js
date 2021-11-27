const router = require("express").Router();
const verify = require("./verifyToken");

const schemas = require("../validators/noteValidation");
const { validationMiddleware } = require("../middlewares/validation");

const {
  postCreateNote,
  postEditNote,
  postDeleteNote,
  getOpenNote,
  getListNotes,
} = require("../controllers/noteController");

router.post(
  "/create",
  verify,
  validationMiddleware(schemas.createNoteValidation),
  postCreateNote
);

router.post(
  "/edit",
  verify,
  validationMiddleware(schemas.editNoteValidation),
  postEditNote
);

router.post(
  "/delete",
  verify,
  validationMiddleware(schemas.deleteNoteValidation),
  postDeleteNote
);

router.post(
  "/open",
  verify,
  validationMiddleware(schemas.openNoteValidation),
  getOpenNote
);

router.get("/list", verify, getListNotes);

module.exports = router;
