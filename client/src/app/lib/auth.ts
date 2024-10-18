"use server";

export default async function checkPassword(data: FormData) {
    return data.get("password")?.toString() == process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
}