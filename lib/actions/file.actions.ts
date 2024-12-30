import { createAdminClient } from "../appwrite"

export const fileUpload = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    const { storage, databases } = await createAdminClient();
}