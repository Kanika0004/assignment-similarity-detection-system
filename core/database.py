from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("sqlite:///storage/similarity_results.db")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class SimilarityResult(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True)
    file1 = Column(String, nullable=False)
    file2 = Column(String, nullable=False)
    score = Column(Float, nullable=False)
    risk = Column(String, nullable=False)

Base.metadata.create_all(engine)
