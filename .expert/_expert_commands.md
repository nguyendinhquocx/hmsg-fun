# EXPERT COMMAND SYSTEM

## AVAILABLE COMMANDS

### WORKFLOW NAVIGATION:
- `*exit` - Kết thúc consultation và return to BMAD workflow context
- `*help` - Hiển thị full command list và usage instructions

### CONSULTATION MANAGEMENT:
- `*save [filename]` - Save current consultation to docs/consultations/
- `*summary` - Generate consultation summary với key insights
- `*recommendations` - Create structured actionable items list

### BMAD INTEGRATION:
- `*create-story` - Generate BMAD story từ expert recommendations
- `*update-docs` - Apply insights to relevant project documents  
- `*workflow-status` - Show current BMAD phase và context

### EXPERT SPECIFIC:
- `*deep-dive [topic]` - Detailed analysis of specific area
- `*compare [options]` - Comparative analysis of alternatives
- `*validate [approach]` - Expert validation of proposed solution

## COMMAND USAGE EXAMPLES:

### Basic Consultation Flow:
```
User: Làm sao optimize React performance?
Expert: [Provides detailed analysis]
User: *recommendations
Expert: [Generates actionable list]
User: *save react-optimization-review
Expert: [Saves to docs/consultations/]
User: *exit
Expert: [Returns to BMAD workflow]
```

### Advanced Integration:
```
User: Review architecture security
Expert: [Security analysis]
User: *create-story
Expert: [Generates security story for BMAD]
User: *update-docs
Expert: [Updates architecture.md with security requirements]
User: *exit
Expert: [Returns to dev workflow with new story ready]
```

## AUTO-DOCUMENTATION TRIGGERS:

### Automatic Save Conditions:
- When `*exit` is used
- After `*recommendations` command
- When `*create-story` generates BMAD artifacts

### Documentation Structure:
```
docs/consultations/
├── YYYY-MM-DD-[expert-domain]-session-[id].md
├── YYYY-MM-DD-security-review-001.md
└── consultation-index.md
```

## INTEGRATION PROTOCOLS:

### BMAD Context Preservation:
```javascript
const expertSession = {
    entryContext: getCurrentBMADPhase(),
    currentStory: getActiveStory(),
    projectFiles: getRelevantDocs(),
    exitStrategy: returnToEntryContext
}
```

### Consultation State Management:
```javascript
const consultationState = {
    expertDomain: extractFromFilename(),
    startTime: Date.now(),
    insights: [],
    recommendations: [],
    bmadActions: []
}
```

## COMMAND IMPLEMENTATION:

### Exit Command:
1. Generate consultation summary
2. Save session to docs/consultations/
3. Create BMAD integration tasks if any
4. Return to exact previous context
5. Notify user of saved artifacts

### Save Command:
1. Collect consultation history
2. Format using consultation template
3. Save to docs/consultations/[filename].md
4. Update consultation index
5. Confirm save location to user

### Recommendations Command:
1. Analyze consultation content
2. Extract actionable items
3. Prioritize by impact và feasibility
4. Format as checklist
5. Link to relevant BMAD workflow steps

---

**IMPLEMENTATION STATUS**: 
- ✅ Command definitions created
- ⏳ Implementation in expert files pending
- ⏳ BMAD integration protocol pending
- ⏳ Auto-documentation system pending