const userRoutes = require("../routes/UserRoutes");
const authRoutes = require("../routes/AuthRoutes");
const dogRoutes = require("../routes/DogRoutes");
const { Router } = require("express");
const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/dog",
    route: dogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
