# Security Specification for Portfolio App

## Data Invariants
1. Site settings must be unique and globally accessible for reading.
2. Projects and Archive items must have valid IDs.
3. Only the authorized administrator (jiyeon040223@gmail.com) can modify data.

## The Dirty Dozen Payloads (Rejection Tests)
1. Unauthorized settings update (No auth).
2. Unauthorized project creation (No auth).
3. Spoofed admin access (Auth but wrong email).
4. Unverified email admin access (Auth with correct email but unverified).
5. Setting ownerId to another user (Identity spoofing).
6. Deleting a project by a non-owner.
7. Injecting massive strings (1MB+) into small fields like `title`.
8. Including shadow fields like `isAdmin: true` in user profiles.
9. Modifying immutable fields like `createdAt`.
10. Out-of-bounds array sizes (e.g., 1000+ keywords).
11. Bypassing schema validation with incorrect types (e.g., string instead of map).
12. Relational poisoning (Creating a project for a non-existent category/parent).

## Test Runner
Verified via `firestore.rules.test.ts` (conceptual).
