const productModdel = require("./../Model/product.Model");
var multer = require("multer");

// config multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only image are allowed!"));
    }
  },
}).single("avatar");

module.exports.index = (req, res) => {
  productModdel.find((err, data) => {
    if (err) {
      console.log("find data error");
    } else {
      res.render("Admin", { page: "adminHome", product: data });
    }
  });
};

module.exports.addProduct = (req, res) => {
  res.render("Admin", { page: "adminAdd" });
};

module.exports.postAddProduct = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Upload error");
    } else if (err) {
      console.log("An unknown error occurred when uploading." + err);
    } else {
      var product = new productModdel({
        title: req.body.tieuDe,
        productCode: req.body.maSP,
        image: req.file.filename,
        nameProduct: req.body.tenSP,
        priceVitua: req.body.giaGoc,
        price: req.body.giaKhuyenMai,
      });

      product.save((err) => {
        if (err) {
          console.log("save data error");
        } else {
          res.redirect("http://localhost:3000/admin");
        }
      });
    }
  });
};

module.exports.editProduct = (req, res) => {
  productModdel.findById(req.params.id, (err, data) => {
    if (err) {
      console.log("find data error");
    } else {
      res.render("Admin", { page: "adminEdit", product: data });
    }
  });
};

module.exports.postEditProduct = (req, res) => {
  upload(req, res, function (err) {
    if (!req.file) {
      productModdel.findByIdAndUpdate(
        req.body.id,
        {
          title: req.body.tieuDe,
          productCode: req.body.maSP,
          nameProduct: req.body.tenSP,
          priceVitua: req.body.giaGoc,
          price: req.body.giaKhuyenMai,
        },
        (err, data) => {
          if (err) {
            console.log("data error in edit");
          } else {
            res.redirect("http://localhost:3000/admin");
          }
        }
      );
    } else {
      if (err instanceof multer.MulterError) {
        console.log("Upload error");
      } else if (err) {
        console.log("An unknown error occurred when uploading." + err);
      } else {
        productModdel.findByIdAndUpdate(
          req.body.id,
          {
            title: req.body.tieuDe,
            productCode: req.body.maSP,
            image: req.file.filename,
            nameProduct: req.body.tenSP,
            priceVitua: req.body.giaGoc,
            price: req.body.giaKhuyenMai,
          },
          (err, data) => {
            if (err) {
              console.log("data error in edit");
            } else {
              res.redirect("http://localhost:3000/admin");
            }
          }
        );
      }
    }
  });
};

module.exports.deleteProduct = (req, res) => {
  productModdel.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("delete error");
    } else {
      res.redirect("http://localhost:3000/admin");
    }
  });
};
