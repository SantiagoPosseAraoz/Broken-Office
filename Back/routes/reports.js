//CREAR LISTAR MODIFICAR ELIMINAR NUESTROS REPORTES
const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const {
  createReport,
  modifyReport,
  deleteReport,
  getAllReports,
  getReportByUserId,
  getPriorityReports,
  getDailyReports,
  reportFullfilled,
  getUserReports,
  rejectedReport,
  getAllPendingReports,
  getAllRejectedReports,
  getAllFullfilledReports,
  getReportById,
  catchReport,
  myReportsCatched,
  myReportsFullfilled,
  myReportsRejected,
  getReportBySearch,
  deleteAllReports,
  getReportWithoutAdmin,
  shareReport,
} = require("../controllers/reports");

//Ruta para buscar reportes sin administrador.

/**
 * @swagger
 * components:
 *  schemas:
 *    Reports:
 *      type: object
 *      properties:
 *        name:
 *         type: string
 *         description: user's name
 *        lastname:
 *         type: string
 *         description: user's lastname
 *        userId:
 *         type: string
 *         description: user's password
 *        email:
 *         type: string
 *         description: user's email
 *        title:
 *         type: string
 *         description: report title
 *        admin:
 *         type: string
 *         default: No admin.
 *         description: user is admin or not
 *        location:
 *         type: string
 *         description: user location
 *        companyRole:
 *         type: string
 *         description: user company role
 *        state:
 *         type: string
 *         default: pending
 *         description: report state pending / fullfilled / rejected
 *        image:
 *         type: string
 *         description: report image
 *        date:
 *         type: string
 *         description: report date
 *        description:
 *         type: string
 *         description: report desc
 *        priority:
 *         type: number
 *         description: report priority 1 to 3
 *        country:
 *         type: string
 *         description: user country.
 *        coord:
 *         type: array
 *         description: user's coord
 *        tags:
 *         type: array
 *         description: reports image tags
 *        messages:
 *         type: array
 *         description: report chat
 *      example:
 *        name: Bautista
 *        lastname: Gomez
 *        email: bautistagomez@gmail.com
 *        title: Accidente con la pc
 *        description: Tuve un accidente con la PC que utilizo para laburar.
 *        priority: 3
 *        image: image.png
 *        userId: 1
 */

/**
 * @swagger
 * /api/report/reportswithoutadmin:
 *  get:
 *    summary: get all reports without admin
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return all reports without admin
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */
router.get("/reportswithoutadmin", validateAuth, getReportWithoutAdmin);
/**
 * @swagger
 * /api/report/search/{search}:
 *  get:
 *    summary: return a search
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        name: search
 *        schema:
 *          type: string
 *        required: false
 *        description: return report by search
 *    responses:
 *      200:
 *        description: report by the search
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *      400:
 *       description: report not found
 */

/**
 * @swagger
 * /api/report/allreports:
 *  get:
 *    summary: get all reports
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return all reports
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/catchedreports:
 *  get:
 *    summary: get catched reports of admin logged
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return catched reports of admin logged
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/myreportsfullfilled:
 *  get:
 *    summary: get fullfilled reports of user logged
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return fullfilled reports of user logged
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/myreportsrejected:
 *  get:
 *    summary: get rejected reports of user logged
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return rejected reports of user logged
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/reportsbyuserid/{id}:
 *  get:
 *    summary: get reports by user id
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *        description: user id
 *    responses:
 *      200:
 *       description: reports by user id
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 */

/**
 * @swagger
 * /api/report/priorityreports/{id}:
 *  get:
 *    summary: get priority reports 1 to 3 levels
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the report priority level
 *    responses:
 *      200:
 *       description: return report by priority level
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 */

/**
 * @swagger
 * /api/report/dailyreports:
 *  get:
 *    summary: get daily reports
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: daily reports
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/myreports:
 *  get:
 *    summary: get all pending reports
 *    tags: [Reports]
 *    responses:
 *      200:
 *       description: return all you reports
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/getreportbyid/{id}:
 *  get:
 *    summary: get report by id
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the report id
 *    responses:
 *      200:
 *       description: return report by id
 *       content:
 *          application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 */

/**
 * @swagger
 * /api/report/getpendingreports:
 *  get:
 *    summary: get all pending reports
 *    tags: [Reports]
 *    responses:
 *      201:
 *       description: return all pending reports
 *       content:
 *          application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 *
 */

/**
 * @swagger
 * /api/report/getrejectedreports:
 *  get:
 *    summary: get all rejected reports
 *    tags: [Reports]
 *    responses:
 *      201:
 *       description: return all rejected reports
 *       content:
 *          application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/getsolvedreports:
 *  get:
 *    summary: get all fullfilled reports
 *    tags: [Reports]
 *    responses:
 *      201:
 *       description: return all fullfilled reports
 *       content:
 *          application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Reports'
 *      401:
 *       description: Unauthorized
 */

/**
 * @swagger
 * /api/report/addreport:
 *  post:
 *    summary: created report
 *    tags: [Reports]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      200:
 *        description: new report created!
 *      401:
 *        description: Unauthorized
 */

/**
 * @swagger
 * /api/report/catchreport/{id}:
 *  put:
 *    summary: updated fullname
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      201:
 *        description: Report
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/modifyreport/{id}:
 *  put:
 *    summary: updated state fullfilled
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      200:
 *        description: Report solved!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/solvereport/{id}:
 *  put:
 *    summary: updated state fullfilled
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            state: 'fullfilled'
 *    responses:
 *      201:
 *        description: Report solved!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/rejectedreport/{id}:
 *  put:
 *    summary: updated state rejected
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            state: 'rejected'
 *    responses:
 *      201:
 *        description: Report rejected!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/removereport/{id}:
 *  delete:
 *    summary: report deleted
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      200:
 *        description: report deleted
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/deleteall:
 *  delete:
 *    summary: delete all reports
 *    tags: [Reports]
 *    responses:
 *      201:
 *        description: Deleted all!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

//Ruta para buscar reportes sin administrador.
router.get("/reportswithoutadmin", validateAuth, getReportWithoutAdmin);

//Ruta para buscar por SEARCH.
router.get("/search/:search", validateAuth, getReportBySearch);

//Ruta para traer TODOS los informes.
router.get("/allreports", validateAuth, getAllReports);

//Ruta para traer los reportes pendientes de un admin logeado.
router.get("/catchedreports", validateAuth, myReportsCatched);

//Ruta para traer todos los reportes solucionados por admin logeado.
router.get("/myreportsfullfilled", validateAuth, myReportsFullfilled);

//Ruta para traer todos los reportes rechazados por admin logeado.
router.get("/myreportsrejected", validateAuth, myReportsRejected);

//Ruta para traer los informes de un usuario pasado por parámetro.(Funcion ADMIN)
router.get("/reportsbyuserid/:id", validateAuth, getReportByUserId);

//Ruta para traer los informes diarios.
router.get("/dailyreports", validateAuth, getDailyReports);

//Ruta para traer los informes prioritarios
router.get("/priorityreports/:id", validateAuth, getPriorityReports);

//Ruta para traer informes de un user logeado.
router.get("/myreports", validateAuth, getUserReports);

//Ruta para traer informes por ID pasado por parámetro.
router.get("/getreportbyid/:id", getReportById);

//Ruta para traer informes PENDIENTES.
router.get("/getpendingreports", validateAuth, getAllPendingReports);

//Ruta para traer informes RECHAZADOS.
router.get("/getrejectedreports", validateAuth, getAllRejectedReports);

//Ruta para traer informes RESUELTOS.
router.get("/getsolvedreports", validateAuth, getAllFullfilledReports);

//Ruta para crear un informe.
router.post("/addreport", validateAuth, createReport);

//Ruta para que un admin pueda tomar un reporte.
router.put("/catchreport/:id", validateAuth, catchReport);

//Ruta para que un usuario modifique su informe.
router.put("/modifyreport", validateAuth, modifyReport);

//Ruta para marcar un informe como resuelto pasado por parámetro.
router.put("/solvereport/:id", validateAuth, reportFullfilled);

//Ruta para marcar un informe como rechazado.
router.put("/rejectedreport/:id", validateAuth, rejectedReport);

//Ruta para borrar un informe pasado por parámetro.
router.delete("/removereport/:id", validateAuth, deleteReport);

//Ruta para borrar todos los informes.
router.delete("/deleteall", validateAuth, deleteAllReports);

//Ruta para compratir un informe.
//En su parametro _id necesita el id del reporte a compartir
//En su req.body necesita:
//email : (email del destinatario)
//subject : (el asunto del mensaje, que sea corto para que no de problemas con los diferentes sistemas de mail)
//message : (Un mensaje personalizado que quiera enviar a la persona quien recibirá el email)
router.post("/share/:_id", validateAuth, shareReport);

module.exports = router;
