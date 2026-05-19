import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy: /admin yolunu Basic Auth ile korur.
 * Netlify ortam değişkenlerinden ADMIN_PASSWORD okunur.
 */
export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("Admin erişimi yapılandırılmamış.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    try {
      const base64 = authHeader.split(" ")[1];
      const decoded = atob(base64);
      const [, password] = decoded.split(":");

      if (password === adminPassword) {
        return NextResponse.next();
      }
    } catch {
      // invalid auth header
    }
  }

  return new NextResponse("Yetkisiz erişim", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Serra Otel Admin"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
