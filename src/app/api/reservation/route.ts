import { NextResponse } from "next/server";

import { reservationSchema } from "@/lib/validations/reservation";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = reservationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  console.log("reservation-request", parsed.data);

  return NextResponse.json({ ok: true });
}
