# Initial Design

## Database Schema

With this design, article, podcast, book all become invariants of the "content" model in our domain.

```mermaid
erDiagram
    User {
        string userId "Primary Key"
        string name
        string email
        string apiKey
    }

    Content {
        string contentId "Primary Key"
        string contentType
        string author "Nullable"
        string isbn "Nullable"
        string url "Nullable"
        string summary "Nullable"
    }

    Memory {
        string memoryId "Primary Key"
        string userId "Foreign Key"
        string contentId "Foreign Key"
        string title
        datetime timestamp
    }

    TAG {
        string tagId "Primary Key"
        string tagName
    }

    MEMORY_TAGS {
        string memoryId "Foreign Key"
        string tagId "Foreign Key"
    }

    User ||--o{ Memory : "creates"
    Content ||--o{ Memory : "detailed_in"
    Memory ||--o{ MEMORY_TAGS : "categorized_by"
    TAG ||--o{ MEMORY_TAGS : "categorizes"
```

## API

General design - not all routes below have to exist.

### Memories

- List Memories: GET /memories
- Create Memory: POST /memories
- Get Memory: GET /memories/{memoryId}
- Update Memory: PUT /memories/{memoryId}
- Delete Memory: DELETE /memories/{memoryId}

### Books

- Create a Book Memory: POST /memories/books
- Get a Book Memory: GET /memories/books/{memoryId}
- Update a Book Memory: PUT /memories/books/{memoryId}
- Delete a Book Memory: DELETE /memories/books/{memoryId}

### Articles

- Create an Article Memory: POST /memories/articles
- Get an Article Memory: GET /memories/articles/{memoryId}
- Update an Article Memory: PUT /memories/articles/{memoryId}
- Delete an Article Memory: DELETE /memories/articles/{memoryId}

### Podcasts

- Create a Podcast Memory: POST /memories/podcasts
- Get a Podcast Memory: GET /memories/podcasts/{memoryId}
- Update a Podcast Memory: PUT /memories/podcasts/{memoryId}
- Delete a Podcast Memory: DELETE /memories/podcasts/{memoryId}
