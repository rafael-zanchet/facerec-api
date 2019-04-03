const handleProfile = (req, res, db) => {
  const {id} = req.params;
  //let found = false;
  /*database.users.forEach(user => {
      if (user.id === id){
          found = true;
          return res.json(user);
      }
  })*/
  db.select('*').from('users').where({
      id: id
  })
  .then(users => {
    if (users.length){
      res.status(200).json(users[0])
    }else{
      res.status(400).json('User not found')
    }
  })        
      
  .catch(err => res.status(400).json('Something wrong'))
  
  /*if (!found){
      res.status(400).json('id not found');
  }*/
}
module.exports = {handleProfile: handleProfile};