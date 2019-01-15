function isAdmin(req, res, next) {
    if (res.locals != null) {
        var user_id = res.locals.user_id
        db.query('SELECT * FROM user_roles WHERE user_id=?',
            [user_id],
            function (error, results) {
                if (results[0] != null && results[0].role == 1) {
                    next()
                } else {
                    res.sendStatus(403);
                }
            })
    }
}

exports.isAdmin = isAdmin;
