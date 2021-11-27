const {
  createNote,
  getNote,
  listNotes,
  deleteNote,
  editNote,
} = require("../services/noteDb");

const postCreateNote = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id;

    const createdNote = await createNote(
      title || `untitled-${Date.now()}`,
      body || "",
      userId
    );
    res.status(200).send(createdNote);
  } catch (e) {
    console.log(e.stack);
    res.status(500).send({ message: e.message }); //&& next(e);
  }
};

const postEditNote = async (req, res, next) => {
  try {
    const { title, body, noteId } = req.body;
    const userId = req.user.id;
    const editedNote = await editNote(userId, noteId, title, body);
    res.status(200).send(editedNote);
  } catch (e) {
    console.log(e.stack);
    res.status(500).send({ message: e.message }); //&& next(e);
  }
};

const getOpenNote = async (req, res, next) => {
  try {
    const { noteId } = req.body;
    const userId = req.user.id;

    const note = await getNote(userId, noteId);
    res.status(200).send(note);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message }); //&& next(e);
  }
};

const getListNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const noteList = await listNotes(userId, page, limit);
    res.status(200).send(noteList);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message }); //&& next(e);
  }
};

const postDeleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.body;
    const userId = req.user.id;
    const deletedNote = await deleteNote(userId, noteId);
    res.status(200).send(deletedNote);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message }); //&& next(e);
  }
};

module.exports = {
  postCreateNote,
  postEditNote,
  postDeleteNote,
  getOpenNote,
  getListNotes,
};
