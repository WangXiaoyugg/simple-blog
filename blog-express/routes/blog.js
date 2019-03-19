var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
    res.json({
        errno: 0,
        data: ['a', 'b', 'c']
    })
});

router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'OK'
    })
});
module.exports = router;
