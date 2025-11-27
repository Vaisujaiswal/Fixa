





import express from "express";
import { createReview, getReviews, deleteReview } from "../controllers/reviewController.js";
import authReview from "../middlewares/authReview.js";

const router = express.Router();

// POST /api/reviews → Add/Update review
router.post("/", authReview, createReview);

// GET /api/reviews/:providerId → Get all reviews
router.get("/:providerId", getReviews);

// DELETE /api/reviews/:reviewId → Delete review
router.delete("/:reviewId", authReview, deleteReview);

export default router;
