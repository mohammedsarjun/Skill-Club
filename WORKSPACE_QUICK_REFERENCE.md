# Workspace Feature Quick Reference

## Tab Structure

### Freelancer Contract Page
```
┌─────────────────────────────────────────────┐
│ Contract Details │ Workspace 🔒            │
└─────────────────────────────────────────────┘
                          │
                          ▼
          ┌───────────────────────────────────┐
          │   [Deliverables/Milestones/       │
          │    Timesheet] [Chat] [Files]      │
          └───────────────────────────────────┘
```

### Fixed Price → Deliverables Tab
- Drag & drop upload zone
- Submit button with message input
- Status: Submitted → Approved / Changes Requested
- Resubmit flow for revisions

### Fixed with Milestones → Milestones Tab
- Grid of milestone cards (Title, Amount, Status)
- Click card → Detail view
- Upload deliverable per milestone
- Track: Pending → Funded → Submitted → Approved → Paid

### Hourly Rate → Timesheet Tab
- Timer: [Start/Stop] HH:MM:SS
- Manual entry form (Date, Hours, Description)
- Hour logs table
- Submit timesheet button

### Chat Tab (All Types)
- Message bubbles (left = other, right = own)
- File attachment button
- Send button / Enter key
- Auto-scroll to latest

### Files Tab (All Types)
- Upload button (multiple files)
- File grid with icons
- Download links
- Delete button (owner only)

## Client Contract Page
```
┌─────────────────────────────────────────────┐
│ Contract Details │ Workspace 🔒            │
└─────────────────────────────────────────────┘
                          │
                          ▼
          ┌───────────────────────────────────┐
          │   [Deliverables/Milestones/       │
          │    Timesheet] [Chat] [Files]      │
          └───────────────────────────────────┘
```

### Fixed Price → Deliverables Tab (Client View)
- List of submitted deliverables
- Status badges
- [Approve] button
- [Request Changes] button with note input

### Fixed with Milestones → Milestones Tab (Client View)
- Grid of milestones
- Click to view deliverable
- [Approve & Release Payment] button
- Escrow payment messaging

### Hourly Rate → Timesheet Tab (Client View)
- Timesheet cards by week
- Hour logs table (Date, Hours, Description, Amount)
- [Approve Timesheet] button
- Total hours and amount display

## Workspace Lock Behavior
- Lock icon shown when `status !== 'active'`
- Clicking workspace tab shows modal:
  ```
  ⚠️ Workspace Locked
  The workspace is only available when the contract is active.
  ```

## Component Props Summary

### Freelancer Components
```typescript
DeliverablesWorkspace({
  contractId: string,
  currentDeliverables: IDeliverable[],
  onSubmitDeliverable: (files, message) => Promise<void>,
  onResubmitDeliverable: (id, files, message) => Promise<void>
})

MilestonesWorkspace({
  contractId: string,
  milestones: IMilestoneDeliverable[],
  currency: string,
  onSubmitMilestone: (milestoneId, files, message) => Promise<void>
})

TimesheetWorkspace({
  contractId: string,
  hourlyRate: number,
  currency: string,
  timesheets: ITimesheet[],
  onSubmitTimesheet: (logs) => Promise<void>,
  onSubmitHourLog: (log) => Promise<void>
})

ChatPanel({
  contractId: string,
  messages: IChatMessage[],
  currentUserId: string,
  onSendMessage: (message, attachments?) => Promise<void>
})

FilesTab({
  contractId: string,
  files: IWorkspaceFile[],
  currentUserId: string,
  onUploadFile: (file) => Promise<void>,
  onDeleteFile?: (fileId) => Promise<void>
})
```

### Client Components
```typescript
ClientDeliverablesView({
  contractId: string,
  deliverables: IDeliverable[],
  onApproveDeliverable: (deliverableId) => Promise<void>,
  onRequestChanges: (deliverableId, note) => Promise<void>
})

ClientMilestonesView({
  contractId: string,
  milestones: Milestone[],
  currencySymbol: string,
  onApproveMilestone: (milestoneId) => Promise<void>
})

ClientTimesheetView({
  contractId: string,
  timesheets: ITimesheet[],
  hourlyRate: number,
  currencySymbol: string,
  onApproveTimesheet: (weekStart) => Promise<void>
})
```

## File Upload Configuration
```typescript
uploadApi.uploadFile(file, {
  folder: 'contracts/{contractId}/{context}',
  resourceType: 'auto'
})

Contexts:
- deliverables
- milestones
- chat
- files
```

## Status Flows

### Deliverable Status
```
submitted → approved
         → changes_requested → submitted (resubmit)
```

### Milestone Status
```
pending → funded → submitted → approved → paid
```

### Timesheet Status
```
pending → approved → paid
```

## API Call Examples (TODO Implementation)

### Freelancer Submits Deliverable
```typescript
const uploadedFiles = await uploadApi.uploadFile(file, {
  folder: `contracts/${contractId}/deliverables`,
  resourceType: 'auto'
});

await freelancerActionApi.submitDeliverable(contractId, 
  [{ fileName: file.name, fileUrl: uploadedFiles.secure_url }],
  message
);
```

### Client Approves Milestone
```typescript
await clientActionApi.approveMilestone(contractId, milestoneId);
// Backend releases payment from escrow to freelancer
```

### Freelancer Starts Timer
```typescript
// Local state management
setIsTimerRunning(true);
setTimerStartTime(new Date());

// On stop, submit hour log
const hours = (stopTime - startTime) / (1000 * 60 * 60);
await freelancerActionApi.submitHourLog(contractId, {
  date: new Date().toISOString(),
  hours,
  description: 'Work session'
});
```

## Styling Patterns
```typescript
// Tab active state
className={`px-4 py-2 rounded-lg font-medium transition-colors ${
  active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
}`}

// Status badge
<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
  Approved
</span>

// Action button
<button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
  Approve
</button>
```
