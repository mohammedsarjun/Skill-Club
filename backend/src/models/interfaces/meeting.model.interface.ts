import { Document, Types } from "mongoose";

/* ---------------- Attendance ---------------- */
export interface MeetingAttendance {
  clientJoined: boolean;
  clientLeftAt?: Date | null;
  freelancerJoined: boolean;
  freelancerLeftAt?: Date | null;
}

/* ---------------- Notes ---------------- */
export interface MeetingNotes {
  clientNotes?: string;
  freelancerNotes?: string;
}

/* ---------------- Logs ---------------- */
export interface MeetingLog {
  action: string;
  userId?: Types.ObjectId;
  role: "client" | "freelancer" | "system";
  timestamp: Date;
  details?: Record<string, any>;
}

/* ---------------- Main Meeting Interface ---------------- */
export interface IMeeting extends Document {
  contractId: Types.ObjectId;

  type: "recurring" | "milestone";

  scheduledAt: Date;
  durationMinutes: number;
  deliverablesId?: Types.ObjectId;

  meetingLink?: string;
  milestoneId?: Types.ObjectId;

  status:
    | "proposed"
    | "accepted"
    | "completed"
    | "missed"
    | "partial_missed"
    | "reschedule_requested";

  attendance: MeetingAttendance;

  rescheduleRequestedBy: "freelancer" | null;
  rescheduleProposedTime?: Date | null;

  completedByClient: boolean;

  notes?: MeetingNotes;

  logs: MeetingLog[];

  createdAt: Date;
  updatedAt: Date;
}
