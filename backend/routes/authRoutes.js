import express from "express";
import {
  registerController,
  loginController,
} from "./../controller/authController.js";
import { logout } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstname
 *        - lastName
 *        - email
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        firstname:
 *          type: string
 *          description: User first name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
 *        role:
 *          type: string
 *          description: user role
 *
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal serevr error
 */

//register
router.post("/register", registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: login successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: something went wrong
 */

//login
router.post("/login", loginController);

/**
 * @swagger
 * /api/v1/auth/logout:
 *    post:
 *      summary: logout page
 *      tags: [Auth]
 *    responses:
 *      200:
          {description}: User logged out successfully
        401:
          {description}: Unauthorized - user not logged in
        500:
          {description}: Internal server error
       
        
   
 */
//logout
router.post("/logout", logout);
export default router;
