# VOTE-IT Client README.md

## Manual Installation
If you would prefer to do the installation manually, follow these steps:

Clone the repo:
```bash
git clone -b client git@github.com:codestates/vote-it.git
cd vote-it
## and do something!

# Or do this:
git clone git@github.com:codestates/vote-it.git
cd vote-it
git branch client
git pull origin client

# Or do this:
git init
git remote add origin git@github.com:codestates/vote-it.git
git pull origin client
```

Install the dependencies:
```bash
npm install
```

Set the environment variables:  ( 이후 수정, dotenv 사용 가능 여부 확인 필요 )
```bash
cp .env.example .env

# open .env file and modify the environment variables (if needed)
```



## Commands
Running locally:
```bash
npm run start
```

Build project:
```bash
npm run build
```

## Environment Variables
```bash
# Examples
PORT=3000
ACCESS_SECRET


## add later
```

## Project Structure

```bash
src\
  │--components\    # Components of Detail Objects
  │--pages\         # Routed pages
  | └--components\  # Components of Page Compositions (ex. header, footer, ...)
  │--app.tsx        # Entire Page Rendering Screen
  └--index.tsx      # App entry point
```
