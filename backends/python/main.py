from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy import select
from pydantic import BaseModel
from typing import List

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./todo.db"
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# Database model
class ToDoItemDB(Base):
    __tablename__ = "todo_items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    text: Mapped[str] = mapped_column(index=True)

# Pydantic models
class ToDoItem(BaseModel):
    text: str

class ToDoItemResponse(ToDoItem):
    id: int

    class Config:
        from_attributes = True

# FastAPI app
app = FastAPI()

# Dependency
async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/todos/", response_model=List[ToDoItemResponse])
async def get_todos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ToDoItemDB))
    todos = result.scalars().all()
    return todos

@app.post("/todos/", response_model=ToDoItemResponse)
async def create_todo(todo: ToDoItem, db: AsyncSession = Depends(get_db)):
    db_todo = ToDoItemDB(text=todo.text)
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ToDoItemDB).where(ToDoItemDB.id == todo_id))
    todo = result.scalar_one_or_none()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    await db.delete(todo)
    await db.commit()
    return {"message": "Todo item deleted successfully"}
