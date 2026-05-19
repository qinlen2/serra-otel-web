import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z.string().min(3, "Ad soyad girin."),
  phone: z.string().min(10, "Telefon numarası girin."),
  email: z.string().email("Geçerli e-posta girin.").optional().or(z.literal("")),
  checkIn: z.string().min(1, "Giriş tarihi seçin."),
  checkOut: z.string().min(1, "Çıkış tarihi seçin."),
  guestCount: z.number().min(1).max(6),
  preferredRoomId: z.string().optional(),
  message: z.string().max(500).optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
