export const ATTENDANCE_STATUSES = [
  "alone",
  "with_partner",
  "declined",
] as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];

export type RSVPFormValues = {
  guestName: string;
  attendanceStatus: AttendanceStatus;
  partnerName?: string;
  hasChildren: boolean;
  childrenCount?: number;
  childrenInfo?: string;
};

export type RSVPGuestTotals = {
  adults: number;
  childrenCount: number;
  totalGuests: number;
};

export type SubmitRsvpResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

export type RSVPResponseRow = {
  id: string;
  guest_name: string;
  attendance_status: AttendanceStatus;
  partner_name: string | null;
  has_children: boolean | null;
  children_count: number | null;
  children_info: string | null;
  total_guests: number | null;
  created_at: string | null;
};
