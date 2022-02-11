### VOTE-IT Client README.md

## Manual Installation
If you would prefer to do the installation manually, follow these steps:

Clone the repo:
```
git init
git remote add origin git@github.com:codestates/vote-it.git
git pull origin client
```

Install the dependencies:
```
npm install
```

Set the environment variables:  ( 이후 수정, dotenv 사용 가능 여부 확인 필요 )
```
cp .env.example .env

# open .env file and modify the environment variables (if needed)
```



## Commands
Running locally:
```
npm run start
```

Build project:
```
npm run build
```

## Environment Variables
```
# Examples
PORT=3000
ACCESS_SECRET


## add later
```

## Project Structure

```
src\
  │--components\    # Components of Detail Objects
  │--pages\         # Routed pages
  | └--components\  # Components of Page Compositions (ex. header, footer, ...)
  │--app.tsx        # Entire Page Rendering Screen
  └--index.tsx      # App entry point
```
