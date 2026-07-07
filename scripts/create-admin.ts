import connectDB from "../lib/mongodb";
import Admin from "../app/models/Admin";
import bcrypt from "bcryptjs";

async function setupRoles() {
  try {
    await connectDB();

    // 1. Update existing admin doc to explicitly set role
    const adminUpdateResult = await Admin.updateOne(
      { username: "admin" },
      { $set: { role: "admin" } }
    );

    if (adminUpdateResult.matchedCount === 0) {
      console.warn("No existing admin user found with username 'admin' — skipped update");
    } else {
      console.log("Admin user role updated successfully");
    }

    // 2. Create HR doc (skip if it already exists)
    const existingHr = await Admin.findOne({ username: "hr" });

    if (existingHr) {
      console.log("HR user already exists — skipped creation");
    } else {
      const hashedPassword = await bcrypt.hash("hr@1234", 10);

      await Admin.create({
        username: "hr",
        password: hashedPassword,
        role: "hr",
      });

      console.log("HR user created successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error setting up roles:", error);
    process.exit(1);
  }
}

setupRoles();