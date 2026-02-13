import app from "./app";
import { EnvVariables } from "./config/env";

// Start the server
const bootstrap = () => {
  try {
    app.listen(EnvVariables.PORT, () => {
      console.log(`Server is running on http://localhost:${EnvVariables.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};
bootstrap();
