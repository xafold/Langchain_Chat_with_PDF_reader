import os
from pypdf import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunk):
    embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-base")
    vectorstore = FAISS.from_texts(texts=text_chunk, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(memory_key='chat_history', return_message=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm = llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain

# def user_input(message, conversation):

def main():
    load_dotenv()
    
    uploads_folder = "/home/xafold/projects/langchain/uploads/"
    file_paths = [os.path.join(uploads_folder, filename) for filename in os.listdir(uploads_folder) if filename.lower().endswith(".pdf")]
    #Getting the pdf
    pdf_text = get_pdf_text(file_paths)
    
    #Getting the text chunks
    text_chunk = get_text_chunks(pdf_text)
    
    #Creating the vector store 
    vectorstore = get_vector_store(text_chunk)
    
    #Creating conversation chain
    conversation = get_conversation_chain(vectorstore)

if __name__ == "__main__":
    main()
