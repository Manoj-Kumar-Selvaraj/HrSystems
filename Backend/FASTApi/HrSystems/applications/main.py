from fastapi import FastAPI, Depends
from applications.auth.okta_auth import get_current_user
from applications.routes import employee
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HR System API")

# Allowed origins
origins = [
    "https://okta.manoj-techworks.site",
    "http://localhost:3000",
]

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base route (protected)
@app.get("/")
async def root(user: dict = Depends(get_current_user)):
    return {"message": "Welcome to the HR System API!", "user": user}

# Notice: no more global Depends here
app.include_router(employee.router)
