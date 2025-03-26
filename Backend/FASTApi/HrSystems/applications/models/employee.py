import random
import string
from pydantic import BaseModel, Field

# Function to generate a unique Employee ID (e.g., "T19RXBQ")
def generate_employee_id():
    return "T" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))

# Employee Model
class Employee(BaseModel):
    employee_id: str = Field(default_factory=generate_employee_id)  # Auto-generate unique ID
    name: str
    position: str
    salary: float
