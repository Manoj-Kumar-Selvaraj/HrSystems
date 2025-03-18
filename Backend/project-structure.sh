#!/bin/bash


# Create the project directories
mkdir -p app/routes
mkdir -p migrations

# Create essential Python files
touch app/{main.py,database.py,models.py,schemas.py,crud.py,dependencies.py}
touch app/routes/{employees.py,auth.py}
touch .env
touch requirements.txt
touch README.md

echo "✅ FastAPI project structure created successfully!"
