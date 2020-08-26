const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        res.render('tickets/new', { title: 'New Ticket', flight });
    });
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function (err, tickets) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.ticket, function (err, ticket) {
        res.redirect(`/flights/${req.params.flight}`);
    });
}