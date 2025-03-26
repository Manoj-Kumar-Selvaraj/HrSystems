#!/bin/bash

# Define project root
PROJECT_ROOT="HrSystems"

# Create project structure
mkdir -p $PROJECT_ROOT/applications
mkdir -p $PROJECT_ROOT/applications/routes
mkdir -p $PROJECT_ROOT/applications/models
mkdir -p $PROJECT_ROOT/applications/config

# Create empty files
touch $PROJECT_ROOT/applications/__init__.py
touch $PROJECT_ROOT/applications/main.py
touch $PROJECT_ROOT/applications/config/database.py
touch $PROJECT_ROOT/applications/models/employee.py
touch $PROJECT_ROOT/applications/models/attendance.py
touch $PROJECT_ROOT/applications/models/payroll.py
touch $PROJECT_ROOT/applications/models/performance.py
touch $PROJECT_ROOT/applications/models/recruitment.py
touch $PROJECT_ROOT/applications/models/documents.py
touch $PROJECT_ROOT/applications/routes/employee.py
touch $PROJECT_ROOT/applications/routes/attendance.py
touch $PROJECT_ROOT/applications/routes/payroll.py
touch $PROJECT_ROOT/applications/routes/performance.py
touch $PROJECT_ROOT/applications/routes/recruitment.py
touch $PROJECT_ROOT/applications/routes/documents.py
touch $PROJECT_ROOT/requirements.txt

# Install dependencies
echo "fastapi[all]" > $PROJECT_ROOT/requirements.txt
echo "motor" >> $PROJECT_ROOT/requirements.txt
echo "pydantic[email]" >> $PROJECT_ROOT/requirements.txt

echo "Project structure created successfully! 🚀"
