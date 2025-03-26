from fastapi import FastAPI, Depends
from applications.auth.okta_auth import get_current_user
from applications.routes import employee

app = FastAPI(title="HR System API")

# Protect all routes with authentication
@app.get("/")
async def root(user: dict = Depends(get_current_user)):
    return {"message": "Welcome to the HR System API!", "user": user}

# Register API routes (protected)
app.include_router(employee.router, dependencies=[Depends(get_current_user)])

