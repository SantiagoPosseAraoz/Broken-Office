const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  promote,
  demote,
  all,
  activate,
  deactivate,
  oneUser
} = require("../controllers/admin");



/**
 * @swagger
 * /api/admin/all:
 *  get:
 *    summary: return all user
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all user
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      401:
 *        description: Unauthorized
 */


/**
 * @swagger
 * /api/admin/promote/{userId}:
 *  put:
 *    summary: promote to admin
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        _id: userId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            isAdmin: true
 *    responses:
 *      200:
 *        description: user updated!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/admin/demote/{userId}:
 *  put:
 *    summary: demote to admin
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        _id: userId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            isAdmin: false
 *    responses:
 *      200:
 *        description: user updated!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/admin/activate/{userId}:
 *  put:
 *    summary: activate to admin
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        _id: userId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            active: true
 *    responses:
 *      200:
 *        description: user updated!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/admin/deactivate/{userId}:
 *  put:
 *    summary: deactivate to admin
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        _id: userId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            active: false
 *    responses:
 *      200:
 *        description: user updated!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */


router.get("/all", validateAuth, validateAdmin, all);
router.put("/promote/:userId", validateAuth, validateAdmin, promote);
router.put("/demote/:userId", validateAuth, validateAdmin, demote);
router.put("/activate/:userId", validateAuth, validateAdmin, activate);
router.put("/deactivate/:userId", validateAuth, validateAdmin, deactivate);
router.get("/all", validateAuth, validateAdmin, all);
router.get("/user/:id",validateAuth,validateAdmin, oneUser)

module.exports = router;
