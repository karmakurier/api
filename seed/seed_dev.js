/**
 * Seeder for local environment. NEVER USE THIS SEEDER UNALTERED FOR PRODUCTION!!!!
 */
const Mission = require('../models/mongoose/mission');
const Status = require('../models/mongoose/status');
const PaymentMethod = require('../models/mongoose/paymentMethod');
const Category = require('../models/mongoose/category')
const sqlModels = require('../models/sequelize');
const bcrypt = require('bcrypt');


module.exports = {
    seedDevelopment: async () => {
        const hashedPassword = await bcrypt.hash("Start#1234!", 10);
        // Seed initial Role
        let foundRole = await sqlModels.role.findOne({ where: { name: 'USER' } });
        if (!foundRole) {
            sqlModels.role.create({
                name: "USER",
                description: "The default user role."
            });
        } else {
            console.log("Seeder: Default Role is already seeded.");
        }

        // Seed initial User
        let foundUser = sqlModels.user.findOne({ where: { email: 'test@a.de' } });
        if (!foundUser) {
            await sqlModels.role.findOne({ where: { name: "USER" } }).then(defaultRole => {
                let plainRole = defaultRole.get({ plain: true });

                sqlModels.user.create({
                    firstName: "Max",
                    lastName: "Mustermann",
                    email: "test@a.de",
                    phone: "+491710000000",
                    zip: "01067",
                    city: "Dresden",
                    address: "Theaterplatz 1",
                    acceptedPrivacyStatement: true,
                    allowedCalls: true,
                    isVerified: false,
                    smsConfirmed: false,
                    password: hashedPassword,
                    roleId: plainRole.id
                });
            });
        } else {
            console.log("Seeder: Default User is already seeded.");
        }

        // Seed initial Status
        var initial_stati = [
            {
                name: "offen",
                description: "Die Mission wurde neu erstellt."
            },
            {
                name: "vom Helfer angenommen",
                description: "Die Mission wurde von einem Helfer angekommen."
            },
            {
                name: "vom Helfer erledigt",
                description: "Die Mission wurde von einem Helfer erledigt."
            },
            {
                name: "abeschlossen",
                description: "Die Mission ist abgeschlossen. Die Aufgabe ist erfüllt und die Bezahlung ist erfolgt."
            }
        ];

        Status.findOne({ name: "offen" }).then(status => {
            if (!status) {
                Status.create(initial_stati, (err, docs) => {
                    console.log("Created " + docs.length + " default statuses");
                });
            } else {
                console.log("Seeder: Status is already seeded.");
            }
        })

        // Seed initial categories
        var initial_categories = [{
            name: "Einkauf",
            description: "Der Hilfesuchende braucht Unterstützung beim Einkaufen."
        }]

        Category.findOne({ name: 'Einkauf' }).then(category => {
            if (!category) {
                Category.create(initial_categories, (err, docs) => {
                    console.log("Created " + docs.length + " default categories");
                });
            } else {
                console.log("Seeder: Default category is already seeded.");
            }
        })

        // seed initial PaymentMethods
        var initial_paymentMethods = [{
            name: "Bar",
            description: "Bargeldübergabe."
        }]

        PaymentMethod.findOne({ name: 'Bar' }).then(paymentMethod => {
            if (!paymentMethod) {
                PaymentMethod.create(initial_paymentMethods, (err, docs) => {
                    console.log("Seeder: Created " + docs.length + " default categories");
                });
            } else {
                console.log("Seeder: Default paymentMethod is already seeded.");
            }
        })

        let user = await sqlModels.user.findOne({ where: { email: 'test@a.de' } });
        user = user.get({ plain: true });
        let paymentMethod = await PaymentMethod.findOne({ name: 'Bar' });
        let overallStatus = await Status.findOne({ name: 'offen' });
        let category = await Category.findOne({ name: 'Einkauf' });

        Mission.findOne({ name: "Test Mission" }).then(missionFound => {
            if (!missionFound) {
                var new_mission = new Mission({
                    name: "Test Mission",
                    description: "Ich brauche hilfe beim Einkaufen, bitte holt alle Dinge der Einkaufsliste.",
                    maxPrice: 100,
                    zip: "01187",
                    address: "Münchner Platz 1",
                    locationX: 0,
                    locationY: 0,
                    creatorId: user.id,
                    helperId: null,
                    paymentMethod: paymentMethod._id,
                    status: overallStatus._id,
                    karmaPoints: 10,
                    category: category._id,
                    paymentStatus: "unbezahlt",
                    isReviewed: true,
                    checkList: [
                        {
                            name: "Eier",
                            quantity: 2,
                            checked: false
                        }
                    ],
                    receipts: null
                });
                new_mission.save(function (err, new_mission) {
                });
            } else {
                console.log("Seeder: Mission already seeded.")
            }
        })
    }
}
