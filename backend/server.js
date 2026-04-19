import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB(); // 🔥 DB connect first

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});