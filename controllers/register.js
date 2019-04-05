const handleRegister = (req, res, db, bcrypt) => {
  //console.log(req.body);
  /*database.users.push({
      id: '125',
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
  })*/
const {name, email, password} = req.body;
if (!name || !email || !password ){
  res.status(400).json('Unable to register 1'); 
}else{
  const pass = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      id: 10,
      hash: pass,
      email: email
    })
    .into('login')
    .then(newId => {
      return trx.select('email').from('login').where('id', '=', newId)
        .then(loginEmail => {
          console.log('reg 2');
          return trx('users')
          .insert({
            name: name, 
            email: loginEmail[0].email,
            joined: new Date()
          })
          .then(newUser => {
            return trx.select('*').from('users').where('email', 'like', loginEmail[0].email)
              .then(user => {
                console.log('reg 3');
                res.status(200).json(user[0]);
              })              
          })
      })
        
    })
    .then(trx.commit)
    .catch(trx.rollback)          
  })
  .catch(err => {
    console.log(err, db);
    res.status(400).json('Unable to register 2');
  })
    //res.json(database.users[database.users.length -1]);
}
}

module.exports = { handleRegister: handleRegister};