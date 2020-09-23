const Note = require('../models/Note');
const config = require('../config');
var bodyParser = require('body-parser')


var jsonParser = bodyParser.json()

module.exports = server => {
  // Get Notes
  server.get('/notes', jsonParser, async (req, res, next) => {
    try {
      const notes = await Note.find({});
      res.send(notes);
      next();
    } catch (err) {
    }
  });

  // Create Note
  server.post(
    '/notes', jsonParser,
    async (req, res, next) => {
      const { id, noteName, itemsList, dateCreated, dateUpdated } = req.body;
      const note = new Note({
        id,
        noteName,
        itemsList,
        dateCreated,
        dateUpdated
      });


      try {
        const newNote = await note.save();
        res.send(201);
        next();
      } catch (err) {
        throw err
      }

    }
  );

  // Update Note
  server.put(
    '/notes', jsonParser,
    async (req, res, next) => {
      try {
        const note = await Note.findOneAndUpdate(
          { id: req.body.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        throw err

      }
    })

  // Delete Customer
  server.delete(
    '/notes', jsonParser,
    async (req, res, next) => {
      try {
        const note = await Note.findOneAndRemove({
          id: req.body.noteid
        });
        res.send(204);
        next();
      } catch (err) {
        throw err
      }


    }
  );
};