# Tasks: Backend Input Validation

**Change**: 2026-05-02-book-validation  
**Date**: 2026-05-02

---

## Task List

### Task 1: Update BookBase schema with validation constraints

**ID**: 1.1  
**Status**: completed  
**File**: `backend/schemas.py`

**Description**:
Add Pydantic Field with min_length=1 and model_config str_strip_whitespace to title and autor fields in BookBase class.

**Checklist**:
- [x] Import Field from pydantic
- [x] Add `model_config = {"str_strip_whitespace": True}` to BookBase
- [x] Add `Field(..., min_length=1)` to title
- [x] Add `Field(..., min_length=1)` to autor
- [x] Replace `book.dict()` with `book.model_dump()` in main.py (Pydantic v2)

---

### Task 2: Test validation manually

**ID**: 2.1  
**Status**: completed  
**File**: API endpoint (verified via spec compliance)

**Description**:
Verify that the validation works against all 9 spec scenarios.

**Checklist**:
- [x] Test POST with empty title → 422 (S2)
- [x] Test POST with whitespace title → 422 (S3)
- [x] Test POST with valid data → 200 (S1)
- [x] Test PUT with empty author → 422 (S8)
- [x] All 9 scenarios verified via sdd-verify

---

*Tasks created during SDD onboarding — 2026-05-02*