const models = require('../models/sequelize');
const express = require("express");
const router = express.Router();

// READ all
router.get('/', (req, res, next) => {
    models.role.findAll().then(roles => {
        res.send(roles);
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
});

// CREATE single
router.post('/', (req, res, next) => {
    if (req.body.name) {
        models.role.create({
            name: req.body.name,
            description: req.body.description ? req.body.description : ""
        }).then(createdRole => {
            res.send(createdRole.get({ plain: true }));
        }).catch(e => {
            console.log(e);
            res.sendStatus(500);
        })
    }
});

// READ Single
router.get('/:id', (req, res, next) => {
    models.role.findOne({ where: { id: req.params.id } }).then(role => {
        res.send(role.get({ plain: true }));
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    });
});

// UPDATE single
router.put('/:id', (req, res, next) => {
    if (req.body.name && req.body.description) {
        models.role.findOne({ where: { id: req.params.id } }).then(role => {
            role.name = req.body.name;
            role.description = req.body.description;
            role.save().then(role => {
                res.send(role);
            })
        });
    }
});

// DELETE single
router.delete('/:id', (req, res, next) => {
    models.role.destroy({ where: { id: req.params.id } }).then(() => {
        res.sendStatus(200);
    }).catch(e => {
        console.log(e);
        res.sendStatus(500);
    })
});

module.exports = router;