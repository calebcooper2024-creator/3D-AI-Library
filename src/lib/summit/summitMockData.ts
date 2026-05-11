export const summitProviders = [
  { name: "Dr. Patel", group: "Shoulder and elbow", locations: ["Summit Main", "Summit East"] },
  { name: "Dr. Morrison", group: "Shoulder and elbow", locations: ["Summit Main"] },
  { name: "Dr. Cohen", group: "Hand and wrist", locations: ["Summit West"] },
  { name: "Dr. Webb", group: "Hand and wrist", locations: ["Summit Main"] },
  { name: "Dr. Chen", group: "Hip and knee", locations: ["Summit Main", "Summit East"] },
  { name: "Dr. Park", group: "Hip and knee", locations: ["Summit West"] },
  { name: "Dr. Adams", group: "Hip and knee", locations: ["Summit Main"] },
  { name: "Dr. Williams", group: "Spine, back, and neck", locations: ["Summit East"] },
  { name: "Dr. Nguyen", group: "Spine, back, and neck", locations: ["Summit Main"] },
  { name: "Dr. Rodriguez", group: "Foot and ankle", locations: ["Summit West"] },
  { name: "Dr. Kim", group: "Sports medicine", locations: ["Summit Main"] },
] as const;

export const summitReviewFields = [
  "Call ID",
  "Caller name",
  "DOB confirmation",
  "Patient match",
  "Visit reason",
  "Routing basis",
  "Provider",
  "Location",
  "Requested slot",
  "Work comp flag",
  "Transfer status",
  "Agent confidence",
  "Review status",
] as const;

export const summitDemoPatient = {
  name: "Jordan Ellis",
  dob: "04/12/1971",
  patientId: "ECW-DEMO-1842",
  phone: "+1 561 000 0142",
  matchStatus: "matched existing patient",
};
