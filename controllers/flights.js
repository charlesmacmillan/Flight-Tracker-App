const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
  delete: deleteFlight
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights/index", { title: "All Flights", flights });
  });
}

function newFlight(req, res) {
  res.render("flights/new", { title: "Add Flight", });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect('/flights/new');
    console.log(flight);
    res.redirect('flights');
  });
}

function deleteFlight(req, res) {
  // Use the model to delete the to-do
  Flight.del(req.body.id);
  // Redirect because we changed data
  res.redirect("flights");
}

