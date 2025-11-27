








import reviewModel from "../model/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { providerId, rating, comment } = req.body;

    if (!providerId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ take userId from token (auth middleware)
    const userId = req.userId;

    // Check if user already reviewed this provider
    const existing = await reviewModel.findOne({ providerId, userId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.status(200).json({ success: true, message: "Review updated", review: existing });
    }

    const review = new reviewModel({ providerId, userId, rating, comment });
    await review.save();

    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    console.error("createReview:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const reviews = await reviewModel
      .find({ providerId })
      .populate("userId", "name email image");

    res.json({ success: true, reviews });
  } catch (error) {
    console.error("getReviews:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    const review = await reviewModel.findById(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await review.deleteOne();
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.error("deleteReview:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

