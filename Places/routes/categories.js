var express = require('express');
var router = express.Router();
const models = require('../models')


//create a single category
router.post ('/', async function(req, res, next){
  const {name, icon} = req.body
  const category = await models.Category.create({
    name,
    icon
    })
    res.send({
      category
  })
  console.log()
})


//update a single category
 router.patch ('/:id', async function(req, res, next){
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
     return res.send({
          message: 'enter a valid id'
      })
  }

const {name, icon} = req.body
const [updatedRows] = await models.Category.update({
  name,
  icon
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

//Delete a single category
router.delete('/:id', async function(req, res, next){
  const {id} = req.params
  if (isNaN(id)) {
    return res.send({
         message: 'enter a valid id'
     })
 }
  
const deleted = await models.Category.destroy({
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

//Get a list of categories
router.get('/', async function(req, res, next) {
  const categories = await models.Category.findAll({
  });
  return res.send(categories)
 });


 //Get a single category (here we also want to get the places that belongs to that category)
 router.get('/:id', async function(req, res, next) {
  const category = await models.Category.findOne({
   include: [models.Place]
  });
  return res.send(category)
 });

module.exports = router;
