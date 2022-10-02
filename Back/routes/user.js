const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  register,
  notification,
  login,
  me,
  deleteUser,
  updateUser,
  logout,
  updatePicture,
  search,
  removePicture,
  userSearch,
  allUsers,
} = require("../controllers/user");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *         type: string
 *         description: user's name
 *        lastname:
 *         type: string
 *         description: user's lastname
 *        password:
 *         type: string
 *         description: user's password
 *        email:
 *         type: string
 *         description: user's email
 *        tel:
 *         type: number
 *         description: user's tel
 *        companyRole:
 *         type: string
 *         description: user's companyRole
 *        isAdmin:
 *         type: boolean
 *         default: false
 *         description: is admin or not
 *        active:
 *         type: boolean
 *         default: true
 *         description: is active or not
 *        picture:
 *         type: string
 *         description: user's photo
 *      required:
 *        -name
 *        -lastname
 *        -email
 *      example:
 *        name: Bautista
 *        lastname: Gomez
 *        email: bautistagomez@gmail.com
 *        password: nuevanueva.
 *        isAdmin: true
 *        picture: image.png
 */
/**
 * @swagger
 * /api/user/register:
 *  post:
 *   summary: create a new user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *       description: new user created!
 *     400:
 *       description: error
 */
router.post("/notification", notification);

router.post("/register", register);
/**
 * @swagger
 * /api/user/login:
 *  post:
 *   summary: login a user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *               type: string
 *               description: user's email
 *              password:
 *               type: string
 *               description: user's password
 *   responses:
 *     200:
 *       description: user logged!
 *     500:
 *       description: error
 */

router.post("/login", login);
/**
 * @swagger
 * /api/user/me:
 *  get:
 *   summary: return logged user
 *   tags: [User]
 *   responses:
 *     200:
 *       description: user logged
 *     500:
 *       description: error
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *
 */
router.get("/me", validateAuth, me);
/**
 * @swagger
 * /api/user/allusers/{role}:
 *  get:
 *    summary: return all user by their company role
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: companyRole
 *        schema:
 *          type: string
 *        required: false
 *        description: the user role
 *    responses:
 *      200:
 *        description: all user by their role
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *      400:
 *       description: user not found
 */
router.get("/allusers/:role", validateAuth, validateAdmin, allUsers);

/**
 * @swagger
 * /api/user/search/{search}:
 *  get:
 *    summary: return a search
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: search
 *        schema:
 *          type: string
 *        required: false
 *        description: return the user by the search
 *    responses:
 *      200:
 *        description: user by the search
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *      400:
 *       description: user not found
 */
router.get("/search/:search", validateAuth, userSearch);
/**
 * @swagger
 * /api/user/logout:
 *  post:
 *   summary: logout session
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *       description: logout!
 *     400:
 *       description: error
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: delete user!
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *      500:
 *       description: error
 */
router.delete("/:_id", validateAuth, validateAdmin, deleteUser);
/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *    summary: update a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: update user!
 *      500:
 *        description: error
 */
router.put("/:_id", updateUser);
/**
 * @swagger
 * /api/user/picture/{id}:
 *  put:
 *    summary: update a user's photo
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: update user's photo!
 *      500:
 *        description: error
 */
router.put("/picture/:id", validateAuth, updatePicture);

// router.post("/removepicture", validateAuth, removePicture);

module.exports = router;
