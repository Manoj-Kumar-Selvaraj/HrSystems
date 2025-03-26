from fastapi import FastAPI, Depends
from applications.auth.okta_auth import get_current_user
from applications.routes import employee
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HR System API")

# Define allowed origins
origins = [
    "https://okta.manoj-techworks.site",  # Your frontend URL
    "http://localhost:3000",  # If testing locally
]

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Protect all routes with authentication
@app.get("/")
async def root(user: dict = Depends(get_current_user)):
    return {"message": "Welcome to the HR System API!", "user": user}

# Register API routes (protected)
app.include_router(employee.router, dependencies=[Depends(get_current_user)])

