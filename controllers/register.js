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
    trx('login')
    .returning('id')
    .insert({
      hash: pass,
      email: email
    })
    .then(newId => {
      return trx.select('email').from('login').where('id', '=', newId[0])
        .then(loginEmail => {
          return trx('users')
          .insert({
            name: name, 
            email: loginEmail[0].email,
            joined: new Date()
          })
          .then(newUser => {
            return trx.select('*').from('users').where('email', 'like', loginEmail[0])
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