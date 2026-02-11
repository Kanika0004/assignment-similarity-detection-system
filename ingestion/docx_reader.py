from docx import Document
from preprocessing.text_cleaner import clean_text

def read_docx(path):
    doc = Document(path)
    text = "\n".join([p.text for p in doc.paragraphs])
    return clean_text(text)
