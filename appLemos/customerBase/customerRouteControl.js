// controle de rota de clientes
import express from "express";
let router = express.Router();
import customerTable from "./customerRegistrationTable.js";
import session from "express-session";
import adminAuth from "../middleweres/adminAuth.js";

router.use(
  session({
    secret: "admin",
    cookie: {
      maxAge: 6000000,
    },
  })
);

// CRIAR UM NOVO CLIENTE
router.get("/customer/new", adminAuth, (req, res) => {
  res.render("customer/customerRegistration.ejs");
});

router.get("/customer/list", adminAuth, (req, res) => {
  customerTable.findAll({ order: [["id", "DESC"]] }).then((customers) => {
    res.render("customer/customerList.ejs", {
      customers: customers,
    });
  });
});

router.get("/customer/edit/:id", adminAuth, (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.redirect("/customer/list");
  }
  customerTable
    .findByPk(id)
    .then((customer) => {
      if (customer != undefined) {
        res.render("customer/customerEdit.ejs", {
          customer: customer,
        });
      } else {
        res.redirect("/customer/list");
      }
    })
    .catch((error) => {
      res.redirect("/customer/list");
    });
});

router.post("/customer/save", adminAuth, (req, res) => {
  let { cliente, endereco, cpf, telefone, vendedor, formaPagamento } = req.body;
  customerTable
    .create({
      customers: cliente,
      address: endereco,
      cpf: cpf,
      telephone: telefone,
      seller: vendedor,
      paymentMethod: formaPagamento,
    })
    .then(() => {
      res.redirect("/customer/list");
    })
    .catch((error) => {
      console.log({ error: error.message });
    });
});

router.post("/customer/update", adminAuth, (req, res) => {
  let id = req.body.id;
  let { cliente, endereco, cpf, telefone, vendedor, formaPagamento } = req.body;
  customerTable
    .update(
      {
        customers: cliente,
        address: endereco,
        cpf: cpf,
        telephone: telefone,
        seller: vendedor,
        paymentMethod: formaPagamento,
      },
      {
        where: { id: id },
      }
    )
    .then(() => {
      res.redirect("/customer/list");
    });
});

router.post("/customer/delete", adminAuth, (req, res) => {
  let id = req.body.id;
  console.log(id);
  if (id != undefined) {
    if (!isNaN(id)) {
      customerTable
        .destroy({
          where: { id: id },
        })
        .then(() => {
          res.redirect("/customer/list");
        });
    } else {
      res.redirect("/customer/list");
    }
  } else {
    res.redirect("/customer/list");
  }
});

export default router;
