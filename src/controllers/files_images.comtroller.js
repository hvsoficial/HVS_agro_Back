const Files_images = require("../models/Files_images");

exports.create = async (req, res) => {

    const { originalname: name, size, key, location: url = "" } = req.file;

    const File = await Files_images({
        name,
        size,
        key,
        url
    });

    File
        .save(File)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "There was an error adding the Image."
            });
        });
};

exports.findAll = (req, res) => {

    Files_images.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Images."
            });

        });
};

exports.delete = async (req, res) => {

    const File = await Files_images.findById(req.params.id);

    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: "Id can not be empty!" });
        return;
    }
    await Files_images.findById(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "The Id not exists!" });
                return;
            }
            else {
                File.remove()
                    .then(data => {
                        if (data) {
                            res.send({
                                message: "Image was deleted successfully!" + File.id
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Image with id=" + File.id
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
