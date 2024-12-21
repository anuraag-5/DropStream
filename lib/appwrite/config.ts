export const appwriteConfig = {
    endpoint: process.env.NEXT_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_APPWRITE_PROJECTID!,
    databaseId: process.env.NEXT_APPWRITE_DATABASEID!,
    usersCollectionId: process.env.NEXT_APPWRITE_USERSID!,
    filesCollectionId: process.env.NEXT_APPWRITE_FILESID!,
    bucketId: process.env.NEXT_APPWRITE_BUCKETID!,
    secretKey: process.env.NEXT_APPWRITE_SECRET_KEY!
}