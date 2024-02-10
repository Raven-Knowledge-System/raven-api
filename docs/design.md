# Initial Design

## Database Schema

```mermaid
erDiagram
    USER {
        string UserID "Primary Key"
        string Name
        string Email
        string apiKey
    }

    MEMORY {
        string MemoryID "Primary Key"
        string UserID "Foreign Key"
        string Type "ENUM('BOOK', 'ARTICLE', 'PODCAST')"
        string Title
        datetime Timestamp
    }

    BOOK {
        string BookID "Primary Key"
        string MemoryID "Foreign Key"
        string Author
        string ISBN
        string Summary
    }

    ARTICLE {
        string ArticleID "Primary Key"
        string MemoryID "Foreign Key"
        string URL
        string Summary
    }

    PODCAST {
        string PodcastID "Primary Key"
        string MemoryID "Foreign Key"
        string EpisodeTitle
        string URL
        string Summary
    }

    TAG {
        string TagID "Primary Key"
        string TagName
    }

    MEMORY_TAG {
        string MemoryID "Foreign Key"
        string TagID "Foreign Key"
    }

    USER ||--o{ MEMORY : "creates"
    MEMORY ||--|{ BOOK : "detailed_in"
    MEMORY ||--|{ ARTICLE : "detailed_in"
    MEMORY ||--|{ PODCAST : "detailed_in"
    MEMORY ||--o{ MEMORY_TAG : "categorized_by"
    TAG ||--o{ MEMORY_TAG : "categorizes"
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
