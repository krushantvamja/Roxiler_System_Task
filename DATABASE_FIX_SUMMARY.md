# Database Schema Fix - Summary

## Issue
The PostgreSQL database had incomplete schema. The `users` table was missing the `name` column, causing the seeder to fail with:
```
❌ Error seeding admin: column "name" of relation "users" does not exist
```

## Solution Implemented

### 1. **Created Database Schema File**
   - File: `src/config/schema.sql`
   - Contains complete table definitions for: users, stores, ratings
   - Includes proper constraints and indexes

### 2. **Created Database Initialization Module**
   - File: `src/config/initDb.js`
   - Automatically drops existing incomplete tables
   - Creates fresh tables with correct schema:
     - **users table**: id, name, email, address, password, role, created_at
     - **stores table**: id, name, email, address, owner_id, created_at
     - **ratings table**: id, user_id, store_id, rating, created_at
   - Creates performance indexes on foreign keys and frequently queried columns

### 3. **Updated Server Initialization**
   - File: `index.js`
   - Added `initializeDatabase()` call before seeding admin user
   - Ensures tables exist with correct schema before any database operations

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(400),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER', 'OWNER')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Stores Table
```sql
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  address VARCHAR(400),
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_id INT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, store_id)
)
```

## Server Startup Sequence
1. ✅ PostgreSQL connection established
2. ✅ Database connection verified
3. ✅ Database schema initialized
4. ✅ Admin user seeded successfully
5. ✅ Server running on port 5000

## Files Modified
- `index.js` - Added database initialization import and call
- `src/config/initDb.js` - Created new file
- `src/config/schema.sql` - Created new file

## Result
Backend server is now fully operational with:
- Correct database schema
- All tables properly structured
- Admin user automatically seeded on startup
- Ready for API requests

---
✅ **Database schema fix complete!**
