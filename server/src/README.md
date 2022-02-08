# Source files

Folder that contains typescript files, before they're compiled

## API Endpoints

- `/api/signup` endpoint for creating a new user
- `/api/login` endpoint for login into an existing user
- `/api/addreview` endpoint to add a review to a game
- `/api/getreviews` endpoint to get existing reviews from a game
- `/api/games/rated` endpoint for retrieving default games sorted by ratings
- `/api/games/genre/{genre}` endpoint for retrieving default games by genre (valid igdb genres)

## Files

- `database.ts` connects to the local sqlite file and manage database models
- `env.ts` parse .env file and return the data as exported object
- `index.ts` attach routers to express and start server initialization
- `jwt.ts` validates existing jwts and creates new ones
- `routes.ts` import routes' files and export their functions in a single object
- `validation.ts` provides data validation methods
