from fastapi import APIRouter, HTTPException, Query
from applications.config.database import employees_collection
from applications.models.employee import Employee  # Corrected import
from typing import Optional

router = APIRouter(prefix="/employees", tags=["Employees"])

# Create Employee
@router.post("/")
async def create_employee(employee: Employee):
    employee_dict = employee.dict()
    await employees_collection.insert_one(employee_dict)  # Store in DB
    return {"id": employee.employee_id, "message": "Employee added successfully"}

# Get All Employees (Pagination + Fuzzy Search)
@router.get("/")
async def get_employees(
    skip: int = Query(0, alias="offset"), 
    limit: int = Query(10, alias="limit"),
    name: Optional[str] = None,
    position: Optional[str] = None,
    min_salary: Optional[float] = None,
    max_salary: Optional[float] = None
):
    query = {}

    # Fuzzy Search for Name & Position
    if name:
        query["name"] = {"$regex": f".*{name}.*", "$options": "i"}  # Search anywhere in the name
    if position:
        query["position"] = {"$regex": f".*{position}.*", "$options": "i"}  # Search anywhere in the position
    if min_salary is not None and max_salary is not None:
        query["salary"] = {"$gte": min_salary, "$lte": max_salary}

    employees = await employees_collection.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [{"id": emp["employee_id"], **emp} for emp in employees]

# Get Employee by ID (Fuzzy & Case-Insensitive Search)
@router.get("/{employee_id}")
async def get_employee(employee_id: str):
    employee = await employees_collection.find_one({"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

# Update Employee (Case-Insensitive Search)
@router.put("/{employee_id}")
async def update_employee(employee_id: str, employee: Employee):
    updated = await employees_collection.update_one(
        {"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}}, 
        {"$set": employee.dict()}
    )
    if updated.modified_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee updated successfully"}

# Delete Employee (Case-Insensitive Search)
@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    deleted = await employees_collection.delete_one({"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}})
    if deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
