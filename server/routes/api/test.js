'use strict'

var express = require('express');
var router = express.Router();

// efault get.
router.get('/', function (req, res) {
    res.status(200).send([{
      foo: 'bar',
    }, {
      foo: 'foo'
    }]);
});

module.exports = router;
