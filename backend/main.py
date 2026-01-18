from fastapi import FastAPI, HTTPException
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
from database import database, engine, metadata
from models import books
from schemas import Book, BookCreate
import asyncio

app = FastAPI(title="Book Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://book-tracker1.netlify.app","http://localhost:5173"],  # OK para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    for i in range(10):
        try:
            await database.connect()
            print("✅ Database connected")
            return
        except Exception as e:
            print(f"⏳ Waiting for DB ({i+1}/10): {e}")
            await asyncio.sleep(2)

    raise RuntimeError("❌ Database not available")

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/books", response_model=list[Book])
async def get_books():
    query = books.select()
    return await database.fetch_all(query)

@app.post("/books", response_model=Book)
async def create_book(book: BookCreate):
    book_id = str(uuid4())
    query = books.insert().values(
        id=book_id,
        title=book.title,
        autor=book.autor,
        read=book.read
    )
    await database.execute(query)
    return {**book.dict(), "id": book_id}

@app.put("/books/{book_id}", response_model=Book)
async def update_book(book_id: str, book: BookCreate):
    query = (
        books.update()
        .where(books.c.id == book_id)
        .values(
            title=book.title,
            autor=book.autor,
            read=book.read
        )
    )
    await database.execute(query)
    return {**book.dict(), "id": book_id}

@app.delete("/books/{book_id}", status_code=204)
async def delete_book(book_id: str):
    query = books.delete().where(books.c.id == book_id)
    result = await database.execute(query)

    if result == 0:
        raise HTTPException(status_code=404, detail="Book not found")
