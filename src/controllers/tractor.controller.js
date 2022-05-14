const Tractor = require("../models/Tractor");


exports.create = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    await Tractor.findOne({ title })
        .then(data => {
            if (data) {
                res.status(400).send({ message: "The content already exists!" });
                return;
            }
            else {
                const tractor = new Tractor({
                    title: req.body.title,
                });
                tractor
                    .save(tractor)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "There was an error adding the Tractor."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tractors."
            });
        });

};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tractor.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tractors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tractor.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tractor with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tractor with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tractor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tractor with id=${id}. Maybe Tractor was not found!`
                });
            } else res.send({ message: "Tractor was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tractor with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tractor.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tractor with id=${id}. Maybe Tractor was not found!`
                });
            } else {
                res.send({
                    message: "Tractor was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tractor with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {

    Tractor.deleteMany()
        .then(data => {
            if (data.n == 0) {
                res.status(404).send({
                    message: " Tractors cannot be deleted. Perhaps the Tractors were not found!"
                });
            } else if (data.n == data.deletedCount) {
                res.send({
                    message: `Tractors was deleteds successfully!  Number of tractors excluded : ${data.deletedCount}`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete be Tractors"
            });
        });
};
