import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus

# Load environment variables from .env file
load_dotenv()

username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")
db_name = os.getenv("DB_NAME")

# Encode credentials safely
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

MONGO_URI = f"mongodb://{encoded_username}:{encoded_password}@localhost:27017/{db_name}"

DB_NAME = os.getenv("db_name", "hr_system")

print(MONGO_URI)

# Connect to MongoDB
client = AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]

# Collections
employees_collection = database.get_collection("employees")
attendance_collection = database.get_collection("attendance")
payroll_collection = database.get_collection("payroll")
performance_collection = database.get_collection("performance")
recruitment_collection = database.get_collection("recruitment")
documents_collection = database.get_collection("documents")
