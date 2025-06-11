//manages blog application
import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import categoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userRegister);
router.post("/user/login", AuthController.userLogin);

// Protected routes
router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post(
  "/add/blogs",
  upload.single("thumbnail"),
  checkIsUserAuthenticated,
  BlogController.addNewBlog
);
router.get("/get/blogs/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);


router.delete("/delete/blog/:id", checkIsUserAuthenticated, BlogController.deleteBlog);

router.get("/get/categories", checkIsUserAuthenticated, categoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, categoryController.addNewCategories);

export default router;
