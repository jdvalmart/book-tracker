# Proposal: Backend Input Validation

**Change**: Add required field validation for book title and author

**Intent**:
Prevent empty or whitespace-only titles and authors from being saved to the database. This improves data integrity and provides clear user feedback.

**Scope**:
- ✅ Add Pydantic validation to `BookCreate` schema
- ✅ Validate POST `/books` endpoint
- ✅ Validate PUT `/books/{id}` endpoint
- ❌ Not implementing client-side validation (frontend responsibility)
- ❌ Not adding sanitization (XSS prevention) — future enhancement

**Capabilities**:
- `book-validation` — enforces non-empty title and author on create/update

**Risks**:
- Low: No breaking changes — only rejects NEW invalid requests
- Existing invalid data in DB remains (acceptable for MVP)

---

*Created during SDD onboarding — 2026-05-02*