import pdfplumber
import pytesseract
from docx import Document
import io
from ..preprocessing.text_cleaner import clean_text
from ..core.config import TEXT_THRESHOLD_FOR_OCR


# -----------------------------
# PDF TEXT EXTRACTION
# -----------------------------
def _extract_pdf_text(file_bytes: bytes):
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def _extract_pdf_ocr(file_bytes: bytes):
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            image = page.to_image(resolution=300).original
            text += pytesseract.image_to_string(image) + "\n"
    return text


def read_pdf(file_bytes: bytes):
    text = _extract_pdf_text(file_bytes)

    if len(text.strip()) < TEXT_THRESHOLD_FOR_OCR:
        text = _extract_pdf_ocr(file_bytes)

    return clean_text(text)


# -----------------------------
# DOCX TEXT EXTRACTION
# -----------------------------
def read_docx(file_bytes: bytes):
    file_stream = io.BytesIO(file_bytes)
    doc = Document(file_stream)

    text = "\n".join([p.text for p in doc.paragraphs])
    return clean_text(text)


# -----------------------------
# UNIVERSAL DOCUMENT READER
# -----------------------------
def read_document(filename: str, file_bytes: bytes):
    if filename.endswith(".pdf"):
        return read_pdf(file_bytes)

    if filename.endswith(".docx"):
        return read_docx(file_bytes)

    raise ValueError("Unsupported file format")
