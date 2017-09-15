let express =require('express');
let router = express.Router();

let models = require('../models');


router.get('/inst',(req, res)=>{
   models.SupplierItem.create(
        {SupplierId:1,
         itemId: 3,
         price: 20}
       )
      .then(allSupplier => {
       res.send({students:allSupplier});
    })

});

router.get('/test',(req, res)=>{
   models.Suppliers.findAll({include:[{
            // through akan menghasilkan query INNER JOIN
             model: models.item
             ,
             through:'SupplierItem'
         }]
      })
      .then(allSupplier => {
       res.send({students:allSupplier});
    })

});

router.get('/',(req, res)=>{
   models.Suppliers.all({include:[{
            // through akan menghasilkan query INNER JOIN
             model: models.item
             ,
             through:'SupplierItem'
         }]
      })
      .then(allSupplier => {
       //res.send({students:allStudents});
      res.render('suppliers',{suppliers:allSupplier});
    })

});

router.get('/add',(req, res)=>{
    res.render('suppliers_Add',{err:false});
})

router.post('/add',(req, res)=>{
   models.Suppliers.create(req.body)
   .then(result=>{
       res.redirect('/suppliers/add');
   })
   .catch(error=> {
      res.render('suppliers_Add',{error: error.errors[0].message,err:true});
   });
});

router.get('/delete/:id',(req, res)=>{
  models.Suppliers.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result=>{
      res.redirect('/suppliers');
  })
  .catch(error=> {
      res.send({error:error.stack});
  });
})

router.get('/edit/:id',(req, res)=>{
  models.Suppliers.findOne({
      where: {id: req.params.id}
  })
  .then(supplier => {
      res.render('suppliers_Edit',{supplier:supplier});
  })
})

router.post('/edit/:id',(req, res)=>{
  models.Suppliers.update({
    name: req.body.name,
    kota: req.body.kota},
    {where: { id: req.params.id} }
  )
  .then(result=>{
    res.redirect('/suppliers');
  })
  .catch(err=>{
    res.send({error:error.stack});
  })
})

router.get('/edit/:id/additem',(req, res)=>{
    res.render('suppliers_Add_Item',{supplier:supplier});
})


module.exports = router;
