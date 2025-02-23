import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controller/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjob").post(isAuthenticated, getAdminJobs);
router.route("/get/:id").post(isAuthenticated, getJobById);

export default router;
