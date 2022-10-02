//Controllers reports

const cloudinary = require("cloudinary").v2;
const Reports = require("../models/Reports");
const transporter = require("../config/transporter");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const Rep = {
  //El usuario crea un parámetro. Toma los datos del body.
  createReport: async function createReport(req, res) {
    try {
      const d = new Date();
      const month = d.getMonth() + 1;
      const date = d.getDate() + "-" + month + "-" + d.getFullYear();
      const { image } = req.body;

      const results = await cloudinary.uploader.upload(image, {
        categorization: "google_tagging",
        auto_tagging: 0.8,
      });

      const newReport = await new Reports({
        userId: req.user.id,
        date: date,
        admin: req.body.admin,
        location: req.body.location,
        image: results.secure_url || "",
        tags: results.tags || [],
        country: req.body.country,
        description: req.body.description,
        priority: req.body.priority,
        coord: req.body.coord,
        name: req.body.name,
        email: req.body.email,
        lastname: req.body.lastname,
        date: req.body.date,
        title: req.body.title,
      });

      await transporter.sendMail({
        from: '"Broken Office 📱" <BrokenOfficeP5@gmail.com>',
        to: req.user.email,
        subject: "Report sent!",
        html: { path: "../Front/public/email.html" },
      });

      newReport.save();

      res.status(200).send(newReport);
    } catch (error) {
      res.send(error).status(500);
    }
  },

  //El usuario PUEDE modificar su informe.
  modifyReport: async function modifyReport(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      {
        description: req.body.description,
        priority: req.body.priority,
      }
    );
    res.send(report);
  },

  //El usuario PUEDE eliminar su informe.
  deleteReport: async function deleteReport(req, res) {
    const report = await Reports.deleteOne({ _id: req.params.id })
      .then((reporte) => {
        res.status(200).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar TODOS los informes.
  getAllReports: async function getAllReports(req, res) {
    const report = await Reports.find()
      .then((reporte) => {
        res.status(200).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar informes de UN usuario
  getReportByUserId: async function getReportByUserId(req, res) {
    const report = await Reports.find({ userId: req.params.id })
      .then((reporte) => {
        res.status(200).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar informes por ID.
  getReportById: async function getReportById(req, res) {
    const report = await Reports.find({ _id: req.params.id })
      .then((reporte) => {
        res.status(200).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar informes de UN usuario logeado
  getUserReports: async function getUserReports(req, res) {
    const report = await Reports.find({ userId: req.user.id })
      .then((reporte) => {
        res.status(200).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar informes del día.
  getDailyReports: async function getDailyReports(req, res) {
    const d = new Date();
    const month = d.getMonth() + 1;
    const date = d.getDate() + "-" + month + "-" + d.getFullYear();

    const report = await Reports.find({ date: date })
      .then((repor) => {
        res.status(200).send(repor);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  //Función para mostrar informes PRIORITARIOS (Prioridad nivel 3).
  getPriorityReports: async function getPriorityReports(req, res) {
    const report = await Reports.find({ priority: req.params.id });
    res.send(error);
  },

  //Función para cerrar un informe solucionado.
  reportFullfilled: async function reportFullfilled(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      { state: "fulfilled" }
    )
      .then((reporte) => {
        res.status(201).send("Report solved!");
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para cerrar un informe como rechazado.
  rejectedReport: async function rejectedReport(req, res) {
    try {
      const report = await Reports.update(
        { _id: req.params.id },
        { state: "rejected" }
      );

      const updatedReport = await Reports.find({ _id: req.params.id });

      await transporter.sendMail({
        from: req.user.email,
        to: req.body.data.to,
        subject: req.body.data.subject,
        html: `
      <h1>Hello, it's ${req.user.name}!</h1><br/>
      <p>I have just rejected your report</p>
      <p>${req.body.data.message}</p><br/>
      <p>for the following reason: ${updatedReport[0].description}</p>
      `,
      });
      res.status(201).send("Report rejected!");
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //Función para mostrar TODOS los informes pendientes.
  getAllPendingReports: async function getAllPendingReports(req, res) {
    const report = await Reports.find({ state: "pending" })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar TODOS los informes rechazados.
  getAllRejectedReports: async function getAllRejectedReports(req, res) {
    const report = await Reports.find({ state: "rejected" })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar TODOS los informes pendientes.
  getAllFullfilledReports: async function getAllFullfilledReports(req, res) {
    const report = await Reports.find({ state: "fulfilled" })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para que un admin logeado pueda tomar un reporte.
  catchReport: async function catchReport(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      { admin: req.user.name + " " + req.user.lastname }
    )
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar todos los reportes pendientes de un admin logeado.
  myReportsCatched: async function myReportsCatched(req, res) {
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "pending",
    })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar todos los reportes resueltos de un admin logeado.
  myReportsFullfilled: async function myReportsFullfilled(req, res) {
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "fulfilled",
    })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para mostrar todos los reportes rechazados de un admin logeado.
  myReportsRejected: async function myReportsRejected(req, res) {
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "rejected",
    })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para borrar todos los reportes.
  deleteAllReports: async function deleteAllReports(req, res) {
    const report = await Reports.remove({})
      .then((reporte) => {
        res.status(201).send("Deleted all!");
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para buscar un reporte.
  getReportBySearch: async function getReportBySearch(req, res) {
    const report = await Reports.find();
    let filteredReports = [];

    report.forEach((reporte) => {
      if (reporte.name.toLowerCase().includes(req.params.search.toLowerCase()))
        filteredReports.push(reporte);
      else if (
        reporte.lastname.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filteredReports.push(reporte);
      else if (
        reporte.description
          .toLowerCase()
          .includes(req.params.search.toLowerCase())
      )
        filteredReports.push(reporte);
      else if (
        reporte.email.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filteredReports.push(reporte);
    });
    res.send(filteredReports);
  },

  //Funcion para traer todos los reportes que no tengan un administrador asignado
  getReportWithoutAdmin: async function getReportWithoutAdmin(req, res) {
    const report = await Reports.find({ admin: "No admin." })
      .then((reporte) => {
        res.status(201).send(reporte);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Función para compartir un reporte por mail.
  shareReport: async function shareReport(req, res) {
    try {
      const report = await Reports.find({ _id: req.params._id });

      await transporter.sendMail({
        from: req.user.email,
        to: req.body.email,
        subject: req.body.subject,
        html: `
      <h1>Hello, it's ${req.user.name}!</h1><br/>
      <p>${req.body.message}</p><br/>
      <img src=${report[0].image}/><br/>
      <p>${report[0].description}</p>
      `,
      });
      res.status(200).send("email sent");
    } catch (err) {
      res.status(401).send(err);
    }
  },
};

module.exports = Rep;
