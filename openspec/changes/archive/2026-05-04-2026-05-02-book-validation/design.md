# Design: Backend Input Validation

**Change**: 2026-05-02-book-validation  
**Date**: 2026-05-02

---

## Overview

Add Pydantic validation constraints to the `BookCreate` schema to enforce non-empty title and author fields. FastAPI will automatically handle 422 responses.

---

## Files to Change

### 1. `backend/schemas.py`

**Change**: Add Pydantic `Field` with validation constraints

```python
# Before
class BookBase(BaseModel):
    title: str
    autor: str
    read: Optional[bool] = False

# After
class BookBase(BaseModel):
    title: str = Field(..., min_length=1, strip_whitespace=True)
    autor: str = Field(..., min_length=1, strip_whitespace=True)
    read: Optional[bool] = False
```

**Rationale**:
- `min_length=1` ensures at least one character exists
- `strip_whitespace=True` (Pydantic v2) automatically trims whitespace
- No implementation needed in `main.py` — FastAPI handles validation automatically

---

## Decisions

| Decision | Alternative Considered | Rationale |
|----------|----------------------|-----------|
| Use Pydantic Field constraints | Manual validation in endpoints | Pydantic is built into FastAPI, provides 422 automatically, less code |
| Validate both POST and PUT | Validate only POST | PUT also accepts user input, must be consistent |
| Reject whitespace-only | Trim and accept | Rejecting is clearer — user knows to fix input, not trick system |

---

## Verification Approach

1. **Manual API testing**: Use curl or Postman to test each scenario
2. **FastAPI auto-docs**: Visit `/docs` to test via Swagger UI
3. **No unit tests yet**: Project lacks test infrastructure (engram observation #48)

---

*Design created during SDD onboarding — 2026-05-02*