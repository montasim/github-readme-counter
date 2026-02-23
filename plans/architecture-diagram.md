# Architecture Diagram

## Current Architecture

```mermaid
graph TD
    A[Client Request] --> B[server.js]
    B --> C[src/app.js]
    C --> D[countController.js]
    D --> E[countImageService.js]
    D --> F[counter.txt]
    E --> D
    D --> C
    C --> B
    B --> A
```

**Issues with Current Architecture:**
- Tight coupling between controller and file system
- No error handling middleware
- No logging
- No separation of concerns
- Direct file operations in controller

---

## Proposed Architecture

```mermaid
graph TB
    subgraph Client
        A[Client Request]
    end

    subgraph Server
        subgraph Entry
            B[index.js]
        end

        subgraph App
            C[app.js]
        end

        subgraph Middleware
            D[logger.js]
            E[notFound.js]
            F[errorHandler.js]
        end

        subgraph Routes
            G[counterRoutes.js]
            H[healthRoutes.js]
        end

        subgraph Controllers
            I[CounterController.js]
        end

        subgraph Services
            J[CounterService.js]
            K[ImageService.js]
        end

        subgraph Utils
            L[validators.js]
            M[helpers.js]
        end

        subgraph Config
            N[constants.js]
            O[paths.js]
        end

        subgraph Storage
            P[counter.txt]
        end
    end

    A --> B
    B --> C
    C --> D
    D --> G
    D --> H
    G --> I
    H --> I
    I --> L
    I --> J
    I --> K
    J --> N
    J --> O
    J --> P
    K --> N
    K --> I
    I --> C
    C --> E
    C --> F
    F --> A
```

---

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Logger
    participant Router
    participant Controller
    participant Validator
    participant CounterService
    participant ImageService
    participant ErrorHandler

    Client->>Logger: GET /count.svg?params
    Logger->>Router: Forward request
    Router->>Controller: Handle request
    Controller->>Validator: Validate query params
    Validator-->>Controller: Validated params
    Controller->>CounterService: Get counter
    CounterService-->>Controller: Counter value
    Controller->>CounterService: Increment counter
    CounterService-->>Controller: Updated counter
    Controller->>ImageService: Generate SVG
    ImageService-->>Controller: SVG string
    Controller-->>Client: SVG response

    Note over Client,ErrorHandler: Error Flow
    Controller->>ErrorHandler: Error occurred
    ErrorHandler-->>Client: Error response
```

---

## Component Responsibilities

### Entry Point
- **index.js**: Server initialization, graceful shutdown, signal handling

### App Configuration
- **app.js**: Express app setup, middleware registration, route registration

### Middleware Layer
- **logger.js**: Request/response logging
- **notFound.js**: 404 handler for undefined routes
- **errorHandler.js**: Global error handling

### Routes Layer
- **counterRoutes.js**: Counter endpoint routes
- **healthRoutes.js**: Health check endpoint

### Controllers Layer
- **CounterController.js**: Request handling, orchestrates services

### Services Layer
- **CounterService.js**: Counter operations (read, increment, write)
- **ImageService.js**: SVG generation

### Utilities Layer
- **validators.js**: Input validation functions
- **helpers.js**: Helper functions

### Configuration Layer
- **constants.js**: Magic numbers, default values, SVG config
- **paths.js**: Path configurations

---

## SOLID Principles in Architecture

### Single Responsibility Principle (SRP)
Each component has one clear responsibility:
- Logger: only logs requests
- Router: only routes requests
- Controller: only handles request/response
- CounterService: only manages counter
- ImageService: only generates SVG

### Open/Closed Principle (OCP)
- New routes can be added without modifying existing routes
- New storage backends can be added without modifying CounterService interface
- New image formats can be added without modifying existing code

### Liskov Substitution Principle (LSP)
- Services follow consistent interfaces
- Implementations can be swapped without breaking functionality

### Interface Segregation Principle (ISP)
- Small, focused interfaces for each service
- No unnecessary methods

### Dependency Inversion Principle (DIP)
- Controller depends on service abstractions
- Easy to swap implementations (file → database → Redis)
- Easy to mock for testing

---

## Express.js Best Practices in Architecture

### Middleware Chain
```
Request → Logger → Routes → Controllers → Services → Response
                ↓
            NotFound (if no route matched)
                ↓
            ErrorHandler (if error occurred)
```

### Error Handling Flow
```
Error → ErrorHandler → Log Error → Send Error Response
```

### Request Flow
```
1. Logger middleware logs incoming request
2. Router matches route
3. Controller handles request
4. Services perform business logic
5. Response sent back
6. Logger middleware logs response
```

---

## Benefits of New Architecture

### Maintainability
- Clear separation of concerns
- Easy to locate and modify code
- Consistent structure

### Testability
- Each component can be tested in isolation
- Easy to mock dependencies
- Clear interfaces

### Scalability
- Easy to add new features
- Easy to swap implementations
- Modular design

### Reliability
- Proper error handling
- Comprehensive logging
- Input validation

### Code Quality
- Follows industry best practices
- Clean, readable code
- Well-documented
