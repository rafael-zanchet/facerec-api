const handleSignin = (req, res, db, bcrypt) => {
  /*if (req.body.email === database.users[0].email && req.body.password == database.users[0].password){
      res.status(200).json(database.users[0]);
  }else{
      res.status(400).json('Usuario ou senha invalida');
  }*/
  db.select('email', 'hash').from('login').where('email', 'like', req.body.email)
    .then(data => {
      
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
       if (isValid){
         return db.select('*').from('users').where('email', 'like', req.body.email)
          .then(user => {
            res.status(200).json(user[0]);
          })
          .catch(err => res.status(400).json('Unable to get user'));
       }
       res.status(400).json('Invalid user or pass');
    })
    .catch(err => res.status(400).json('Invalid user or pass'));
}
module.exports = {handleSignin: handleSignin}