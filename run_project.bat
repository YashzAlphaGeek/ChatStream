@echo off
echo ==============================================
echo Starting WebSocket Chat Application
echo ==============================================

REM 1. Build and run the Rust WebSocket server
echo Building Rust WebSocket Server...
cd backend
cargo build --release
if %ERRORLEVEL% neq 0 (
    echo Rust build failed. Exiting...
    exit /b %ERRORLEVEL%
)
echo Running Rust WebSocket Server...
start cargo run
cd..

REM 2. Build the TypeScript frontend
echo Building TypeScript Frontend...
cd frontend
npm install
npm run build
if %ERRORLEVEL% neq 0 (
    echo Frontend build failed. Exiting...
    exit /b %ERRORLEVEL%
)
echo TypeScript frontend built successfully.
echo ==============================================
echo Open the frontend in a browser via index.html
echo ==============================================
