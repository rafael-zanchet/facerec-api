const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ef6a60c3474344ba97e320208013f40c'
 });

 const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('API image error'));
 }

const handleImage = (req, res, db) => {
   
  const { id } = req.body;
  db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(row => {
        db('users').select('entries').from('users').where('id', '=', id)
        .then(entries => {
          res.status(200).json(entries[0]['entries']);
        })
      })
      .catch(err => res.status(400).json('unable to get entries'));
  /*console.log(id);
  let found = false;
  database.users.forEach(user => {
      if (user.id === id){
          found = true;
          user.entries++;
          return res.json(user.entries);
      }
  })

  if (!found){
      res.status(400).json('image not found');
  }*/
}
module.exports = {handleImage: handleImage, handleApiCall: handleApiCall};