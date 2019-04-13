const express = require('express');
const router = express.Router();

router.route('/cards')
.get((req, res) => {
  return new req.database.Card().fetchAll()
    .then((cards) => {
      return res.json(cards);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})
.post((req, res) => {
  return new req.database.Card(req.body).save()
    .then((card) => {
      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

router.post('/cards/delete', (req, res) => {
  let id = req.body.useMe;
  console.log('req.body', req)
    return new req.database.Card({id}).destroy()
    .then(data => {
      return res.json({success: true});
    })
    .catch(err => {
      res.sendStatus(500);
    })
})


module.exports = router;