import { api } from "@/lib/api";
import { CommentResource, EmailContactRequest } from "./coments.interface";

interface ContactResponse {
  message: string;
}

export async function getComments(): Promise<CommentResource[]> {
  const { data } = await api.get<CommentResource[]>(
    "/comment?product=Mr. Soft&limit=2"
  );
  return data;
}

export async function sendEmail(
  body: EmailContactRequest
): Promise<ContactResponse> {
  const { data } = await api.post<ContactResponse>("/contact", body);
  return data;
}
