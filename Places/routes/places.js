var express = require('express');
var router = express.Router();
const models = require('../models')


//Create a single place
router.post ('/', async function(req, res, next){
    const {name, category, address, logo} = req.body
    const place = await models.Place.create({
        name,
        category, 
        address,
        logo
      })
      res.send({
        place
    })
    console.log()
  })

  //Update a single place
  router.patch ('/:id', async function(req, res, next){
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
       return res.send({
            message: 'enter a valid id'
        })
    }
  
  const {name, category, address, logo} = req.body
  const [updatedRows] = await models.Place.update({
    name,
    category, 
    address,
    logo
  }, {
    where: {
      id: id
    }
  })
  if (updatedRows>0){
    res.send({
      message: "Update successful"
    })
  }else{
    res.send({
      message: 'nothing to update'
    })  
  }
  })

  //Delete a single place
  router.delete('/:id', async function(req, res, next){
    const {id} = req.params
    if (isNaN(id)) {
      return res.send({
           message: 'enter a valid id'
       })
   }
    
  const deleted = await models.Place.destroy({
  where:{
    id:id
  }
  })
  if (deleted>0){
    res.send({
        message: `${deleted} row(s) deleted`
    })
  }else{
    res.send({
        message:'nothing deleted'
    })
  }
  })

  //Get a list of places
  router.get('/', async function(req, res, next) {
    const places = await models.Place.findAll({
    });
    return res.send(places)
   });

   //Get a single place (here we also want to get the category that the place belongs to)
   router.get('/:id', async function(req, res, next) {
    const place = await models.Place.findOne({
     include: [models.Category]
    });
    return res.send(place)
   });
  
module.exports = router;