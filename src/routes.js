const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const Images = require("./controllers/files_images.comtroller");
const tractors = require("./controllers/tractor.controller.js");
const upload = multer(multerConfig)



routes.get("/tractors/images", Images.findAll);
routes.post("/tractors/images", upload.single("file"), Images.create);
routes.delete("/tractors/images/:id", Images.delete);


routes.post("/tractors/", tractors.create);
routes.get("/tractors/", tractors.findAll);
routes.get("/tractors/:id", tractors.findOne);
routes.put("/tractors/:id", tractors.update);
routes.delete("/tractors/:id", tractors.delete);
routes.delete("/tractors/", tractors.deleteAll);



module.exports = routes;
