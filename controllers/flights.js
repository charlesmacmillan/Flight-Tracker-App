const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index,
  show,
  new: newFlight,
  create,
  delete: deleteFlight,
};

function index(req, res) {
  Flight.find({}, function (err, flight) {
    flight.sort((a, b) => a.departs - b.departs);
    res.render("flights/index", { title: "Flight Manifest", flight });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, tickets) {
      res.render("flights/show", { title: "Flight Detail", flight, tickets });
    });
  });
}

function newFlight(req, res) {
  const defaultFlight = new Flight();
  const dt = defaultFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", { departsDate, title: "New Flight" });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect("/flights/new");
    console.log(flight);
    res.redirect("/flights");
  });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function (err, flight) {
    res.redirect("/flights");    
  });
}
