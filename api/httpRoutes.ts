const baseRoute = process.env.NEXT_PUBLIC_HTTP_API_BASE_ROUTE;
export const httpAuthenticate = `${baseRoute}/authenticate`;
export const httpUser = (userId: string) => `${baseRoute}/user/${userId}`;
