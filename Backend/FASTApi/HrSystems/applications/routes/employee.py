from fastapi import APIRouter, HTTPException, Query, Depends, Request
from applications.config.database import employees_collection
from applications.models.employee import Employee
from applications.auth.okta_auth import get_current_user
from typing import Optional

router = APIRouter(prefix="/employees", tags=["Employees"])

# -------------------------------
# Safe Authentication Dependency
# -------------------------------
async def get_current_user_safe(request: Request):
    if request.method == "OPTIONS":
        return {}  # Allow preflight without auth
    return await get_current_user(request)

# -------------------------------
# Create Employee
# -------------------------------
@router.post("/")
async def create_employee(employee: Employee, user: dict = Depends(get_current_user_safe)):
    employee_dict = employee.dict()
    await employees_collection.insert_one(employee_dict)
    return {"id": employee.employee_id, "message": "Employee added successfully"}

# -------------------------------
# Get All Employees (Pagination + Fuzzy Search)
# -------------------------------
@router.get("/")
async def get_employees(
    skip: int = Query(0, alias="offset"),
    limit: int = Query(10, alias="limit"),
    name: Optional[str] = None,
    position: Optional[str] = None,
    min_salary: Optional[float] = None,
    max_salary: Optional[float] = None,
    user: dict = Depends(get_current_user_safe)
):
    query = {}

    if name:
        query["name"] = {"$regex": f".*{name}.*", "$options": "i"}
    if position:
        query["position"] = {"$regex": f".*{position}.*", "$options": "i"}
    if min_salary is not None and max_salary is not None:
        query["salary"] = {"$gte": min_salary, "$lte": max_salary}

    employees = await employees_collection.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [{"id": emp["employee_id"], **emp} for emp in employees]

# -------------------------------
# Get Employee by ID
# -------------------------------
@router.get("/{employee_id}")
async def get_employee(employee_id: str, user: dict = Depends(get_current_user_safe)):
    employee = await employees_collection.find_one({"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

# -------------------------------
# Update Employee
# -------------------------------
@router.put("/{employee_id}")
async def update_employee(employee_id: str, employee: Employee, user: dict = Depends(get_current_user_safe)):
    updated = await employees_collection.update_one(
        {"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}},
        {"$set": employee.dict()}
    )
    if updated.modified_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee updated successfully"}

# -------------------------------
# Delete Employee
# -------------------------------
@router.delete("/{employee_id}")
async def delete_employee(employee_id: str, user: dict = Depends(get_current_user_safe)):
    deleted = await employees_collection.delete_one({"employee_id": {"$regex": f".*{employee_id}.*", "$options": "i"}})
    if deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
