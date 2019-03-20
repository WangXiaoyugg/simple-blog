var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
    res.json({
        errno: 0,
        data: {
            username,
            password,
        }
    })
});
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
    res.json({
        errno: 0,
        data: {
            username,
            password,
        }
    })
});
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
    res.json({
        errno: 0,
        data: {
            username,
            password,
        }
    })
});
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
    res.json({
        errno: 0,
        data: {
            username,
            password,
        }
    })
});

router.get('/session-test', function(req, res, next) {
    if(req.session.count == null) {
        req.session.count = 0;
    }
    req.session.count++;
    res.json({
        errno: 0,
        data: {
            count: req.session.count
        }
    })
});

module.exports = router;