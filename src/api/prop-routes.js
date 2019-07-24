const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const Booking = require("../models/booking");

// const status = {
//     NEW: "new", 
//     ACCEPTED: "accepted",
//     REJECTED: "rejected"
// };


router.get("/", async (req, res) => {
    Rental.getAllRentals( (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(result);
        }
    });
})

router.post("/", (req, res) => {
    const property = req.body;
    if (!property.name || !property.location || !property.price) {
        return res.status(400).json({message: "Missing information!"});
    }
    var nProp = new Rental(property.name, property.location, property.price, property.providerID, property.consumerID, property.imageURL);

    Rental.createRental(nProp, (err, result) => { 
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json(result);
        }
       });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Rental.deleteRental(id, (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json("Rental Deleted");
        }
       });
});

   
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Rental.getRentalByID(id, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        } else if (!result) {
            return res.status(400).json({msg: "Rental Not Found!"});
        } else {
            console.log("-- rentals routes's result --", result);
            return res.status(200).json(result);
        }
    });
});

router.post("/:id/book", (req, res) => {
    const propId = req.params.id;
    const request = req.body;

    if (!request.userID || !request.dateFrom || !request.dateTo) {
        return res.status(400).json({message: "Missing information!"});
    }
    var booking = new Booking(propId, request.userID, request.dateFrom, request.dateTo);

    Booking.createBooking(booking, (err, result) => { 
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json(result);
        }
       });
});

    
router.get("/bookings/:id", (req, res) => {
    const id = req.params.id;

    Booking.getBookingByID(id, (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(result);
        }
    });
});

router.get("/:rentalid/:userid", (req, res) => {
    const rentalId = req.params.rentalid;
    const userId = req.params.userid;

    Booking.getBookingByUser(userId, rentalId, (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(result);
        }
    });
});

router.post("/allBookings", async (req, res) => {
    const userId = req.body.userID;

    console.log("-- user id in get --", userId);

    Booking.getAllBookingsByUser(userId, (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            console.log("-- user id inside get all booking --", userId);
            return res.json(result);
        }
    });
});

router.post("/rental/allBookings", async (req, res) => {
    const rentalId = req.body.rentalID;

    console.log("-- rental id in get --", rentalId);

    Booking.getAllBookingsByUser(rentalId, (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            console.log("-- rental id inside get all booking --", rentalId);
            return res.json(result);
        }
    });
});

module.exports = router;