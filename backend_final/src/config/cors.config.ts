const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

export default corsOptions;
