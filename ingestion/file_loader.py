import os
from ingestion.pdf_reader import read_pdf
from ingestion.docx_reader import read_docx

def load_files(folder_path):
    texts = {}
    metadata = {}

    for file in os.listdir(folder_path):
        path = os.path.join(folder_path, file)

        if file.endswith(".pdf"):
            texts[file] = read_pdf(path)
        elif file.endswith(".docx"):
            texts[file] = read_docx(path)
        else:
            continue

        metadata[file] = {
            "size": os.path.getsize(path),
            "word_count": len(texts[file].split())
        }

    return texts, metadata
