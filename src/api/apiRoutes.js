const userRoutes = require("../routes/UserRoutes");
const authRoutes = require("../routes/AuthRoutes");
const dogRoutes = require("../routes/DogRoutes");
const payRoutes = require("../routes/PaymentRoutes");
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
  {
    path: "/pay",
    route: payRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
