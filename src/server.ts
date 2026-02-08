import app from "./app";

// const port = process.env.PORT || 5000; // The port your express server will be running on.

// Start the server
const bootstrap = () => {
  try {
    app.listen(5000, () => {
      console.log(`Server is running on http://localhost:5000`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};
bootstrap();
