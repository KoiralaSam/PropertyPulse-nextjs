"use server";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessages(MessageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(MessageId);

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/", "layout");
}
export default deleteMessages;
