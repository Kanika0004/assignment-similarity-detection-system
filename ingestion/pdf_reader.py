import pdfplumber
import pytesseract
from pdf2image import convert_from_path
from preprocessing.text_cleaner import clean_text
from core.config import TEXT_THRESHOLD_FOR_OCR

def extract_text_pdfplumber(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_text_ocr(path):
    text = ""
    pages = convert_from_path(path)
    for page in pages:
        text += pytesseract.image_to_string(page) + "\n"
    return text

def read_pdf(path):
    text = extract_text_pdfplumber(path)
    if len(text.strip()) < TEXT_THRESHOLD_FOR_OCR:
        text = extract_text_ocr(path)
    return clean_text(text)
