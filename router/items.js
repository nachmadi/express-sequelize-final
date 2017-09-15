let express =require('express');
let router = express.Router();

let models = require('../models');

router.get('/',(req, res)=>{
   models.item.all()
      .then(allitem => {
       //res.send({students:allStudents});
      res.render('items',{items:allitem});
    })

});

router.get('/add',(req, res)=>{
    res.render('items_Add',{err:false});
})

router.post('/add',(req, res)=>{
   models.item.create(req.body)
   .then(result=>{
       res.redirect('/items/add');
   })
   .catch(error=> {
      res.render('items_Add',{error: error.errors[0].message,err:true});
   });
});

router.get('/delete/:id',(req, res)=>{
  models.item.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result=>{
      res.redirect('/items');
  })
  .catch(error=> {
      res.send({error:error.stack});
  });
})

router.get('/edit/:id',(req, res)=>{
  models.item.findOne({
      where: {id: req.params.id}
  })
  .then(item => {
      res.render('items_Edit',{item:item});
  })
})

router.post('/edit/:id',(req, res)=>{
  models.item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem:req.body.codeitem},
    {where: { id: req.params.id} }
  )
  .then(result=>{
    res.redirect('/items');
  })
  .catch(err=>{
    res.send({error:error.stack});
  })
})

module.exports = router;
