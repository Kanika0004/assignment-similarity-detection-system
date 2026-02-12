import os
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

# ---------------------------------------------------
# Create absolute path to database file
# ---------------------------------------------------

# Get backend directory path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path to storage/similarity_results.db
DB_PATH = os.path.join(BASE_DIR, "storage", "similarity_results.db")

# Create SQLite engine
engine = create_engine(
    f"sqlite:///{DB_PATH}",
    connect_args={"check_same_thread": False}  # Required for FastAPI
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base model
Base = declarative_base()

# ---------------------------------------------------
# Database Model
# ---------------------------------------------------

class SimilarityResult(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    file1 = Column(String, nullable=False)
    file2 = Column(String, nullable=False)
    score = Column(Float, nullable=False)
    risk = Column(String, nullable=False)

# ---------------------------------------------------
# Create Tables Automatically
# ---------------------------------------------------

Base.metadata.create_all(bind=engine)
