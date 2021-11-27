const { from } = require("responselike");
const Note = require("../models/Note");
const User = require("../models/User");

const createNote = async (title, body, userId) => {
  try {
    const note = new Note({
      title: title,
      body: body,
      userId,
    });

    const createdNote = await note.save();
    console.log(userId);
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          notes: createdNote._id,
        },
      }
    );

    return { id: createdNote._id, created: true };
  } catch (e) {
    throw new Error(e);
  }
};

const getNote = async (userId, noteId) => {
  try {
    const noteObj = await Note.findOne({ _id: noteId, userId: userId });
    if (noteObj) {
      return noteObj;
    } else {
      throw new Error("Not found");
    }
  } catch (e) {
    throw new Error(e);
  }
};

const editNote = async (userId, noteId, title, body) => {
  try {
    const noteExists = await Note.findOne({
      _id: noteId,
      userId,
    });
    if (noteExists) {
      const noteObj = await Note.updateOne(
        {
          _id: noteId,
          userId: userId,
        },
        { title, body, updatedAt: Date.now() },
        {
          new: true,
        }
      );
      return { success: noteObj.ok };
    } else {
      throw new Error("Not found");
    }
  } catch (e) {
    throw new Error(e);
  }
};

const listNotes = async (userId, page, limit) => {
  try {
    const user = await User.findOne({ _id: userId });
    const noteIdArray = user.notes;

    const skip = limit * (page - 1);
    let noteList;

    noteList = await Note.find({
      _id: { $in: noteIdArray },
    })
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip);
    const lastPage = Math.round(noteIdArray.length / limit);
    const nextPage = page + 1;

    let hasNextPage = page < lastPage;
    return {
      notes: noteList,
      lastPage,
      limit,
      nextPage,
      hasNextPage,
    };
  } catch (e) {
    throw new Error(e);
  }
};

const deleteNote = async (userId, noteId) => {
  try {
    const noteExists = await Note.findOne({
      _id: noteId,
      userId,
    });

    if (noteExists) {
      const deletedNote = await Note.deleteOne({
        _id: noteId,
        userId: userId,
      });

      await User.updateOne({ _id: userId }, { $pull: { notes: noteId } });
    } else {
      throw new Error("Not found");
    }

    return {
      success: deletedNote ? true : false,
    };
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createNote,
  getNote,
  editNote,
  deleteNote,
  listNotes,
};
