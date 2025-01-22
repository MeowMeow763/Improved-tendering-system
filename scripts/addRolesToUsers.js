import connectDB from "/utils/db";
import User from "/models/User";

const addRolesToUsers = async () => {
  await connectDB();

  const users = await User.find();
  for (const user of users) {
    if (!user.role) {
      const role = user.email.includes("client") ? "client" : "bidder";
      await User.updateOne({ _id: user._id }, { $set: { role } });
    }
  }

  console.log("Roles added to users successfully.");
};

addRolesToUsers();
