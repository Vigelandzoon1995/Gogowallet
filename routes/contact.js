var express = require('express');
var auth = require('../modules/auth')
var router = express.Router();

router.get('/getById', auth.verifyToken, function (req, res, next) {
    var id = req.query.id
    var user_id = res.locals.user_id
    db.query('SELECT id, user_id, name, phone, notes, thumbnail from emergency_contacts WHERE id=? AND user_id=?',
        [id, user_id],
        function (error, results, fields) {
            res.send(results);
        });
});

router.get('/getAll', auth.verifyToken, function (req, res, next) {
    var user_id = res.locals.user_id
    db.query('SELECT id, user_id, name, phone, notes, thumbnail FROM emergency_contacts WHERE user_id=?',
        [user_id],
        function (error, results, fields) {
            res.send(results);
        });
});

router.post('/create', auth.verifyToken, function (req, res, next) {
    //Take the user id directly from the jwt middleware to ensure the user only can add contacts to his own account
    var user_id = res.locals.user_id
    var name = req.body.name
    var phone = req.body.phone
    var notes = req.body.notes
    var thumbnail = req.body.thumbnail
    db.query('INSERT INTO emergency_contacts (user_id, name, phone, notes, thumbnail) VALUES(?, ?, ?, ?, ?)',
        [user_id, name, phone, notes, thumbnail],
        function (error, results, fields) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                })
            } else {
                console.log(error)
                res.json({
                    success: false
                })
            }
        },
    );
});

router.get('/delete', auth.verifyToken, function (req, res, next) {
    //Take the user id directly from the jwt middleware to ensure the user only can remove contacts of his own account
    var user_id = res.locals.user_id
    var contact_id = req.query.id
    db.query('DELETE from emergency_contacts WHERE user_id=? AND id=?',
        [user_id, contact_id],
        function (error, results, fields) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                })
            } else {
                console.log(error)
                res.json({
                    success: false
                })
            }
        })
})

router.post('/update', auth.verifyToken, function (req, res, next) {
    //Take the user id directly from the jwt middleware to ensure the user only can update contacts to his own account
    var user_id = res.locals.user_id
    var name = req.body.name
    var phone = req.body.phone
    var notes = req.body.notes
    var thumbnail = req.body.thumbnail
    var id = req.body.id

    db.query('UPDATE emergency_contacts SET name=?, phone=?, notes=?, thumbnail=? WHERE user_id=? AND id=?',
        [name, phone, notes, thumbnail, user_id, id],
        function (error, results, fields) {
            if (results != null && results.affectedRows == 1) {
                res.json({
                    success: true
                })
            } else {
                console.log(error)
                res.json({
                    success: false
                })
            }
        })
})

module.exports = router;