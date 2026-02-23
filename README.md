# GitHub Readme Counter

<!-- repository summary badges start -->
<div>
    <img alt="GitHub contributors badge" src="https://img.shields.io/github/contributors/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub language count badge" src="https://img.shields.io/github/languages/count/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5"/>
    <img alt="GitHub top language badge" src="https://img.shields.io/github/languages/top/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub code size badge" src="https://img.shields.io/github/languages/code-size/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo size badge" src="https://img.shields.io/github/repo-size/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub file count badge" src="https://img.shields.io/github/directory-file-count/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub open issues badge" src="https://img.shields.io/github/issues-raw/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub closed issues badge" src="https://img.shields.io/github/issues-closed-raw/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub open pull requests badge" src="https://img.shields.io/github/issues-pr-raw/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub closed pull requests badge" src="https://img.shields.io/github/issues-pr-closed-raw/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub active milestones badge" src="https://img.shields.io/github/milestones/open/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub completed milestones badge" src="https://img.shields.io/github/milestones/closed/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub license badge" src="https://img.shields.io/github/license/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub last commit badge" src="https://img.shields.io/github/last-commit/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub Discussions badge" src="https://img.shields.io/github/discussions/montasim/github-readme-counter?labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

A modern, well-architected web service that generates dynamic SVG images showing visitor counts. Built with Express.js following Clean Code principles, SOLID design patterns, and industry best practices.

## ✨ Features

- **Dynamic SVG Generation**: Creates customizable SVG images with visitor counts
- **Real-time Counter**: Increments on each request with persistent storage
- **Customizable Appearance**: Customize background and text colors via URL parameters
- **Health Check Endpoint**: Monitor service status and uptime
- **Comprehensive Error Handling**: Proper HTTP status codes and error messages
- **Request Logging**: Detailed logging with color-coded status codes
- **Input Validation**: Validates hex color codes with proper error messages
- **Graceful Shutdown**: Handles termination signals properly
- **Backward Compatible**: Supports both old and new query parameter formats

## 🏗️ Architecture

This project follows a modular, layered architecture with clear separation of concerns:

```
src/
├── config/                    # Configuration management
│   ├── constants.js          # Magic numbers, default values, SVG config
│   ├── paths.js              # Path configurations
│   └── index.js              # Export all configs
├── services/                  # Business logic layer
│   ├── CounterService.js     # Counter operations (read/write/increment)
│   └── ImageService.js       # SVG generation
├── controllers/               # Request handling layer
│   └── CounterController.js  # HTTP request handler
├── routes/                    # Route definitions
│   ├── counterRoutes.js      # Counter endpoint routes
│   ├── healthRoutes.js       # Health check endpoint
│   └── index.js              # Export all routes
├── middleware/                # Express middleware
│   ├── errorHandler.js       # Global error handling
│   ├── logger.js             # Request/response logging
│   └── notFound.js           # 404 handler
├── utils/                     # Utility functions
│   ├── validators.js         # Input validation
│   └── helpers.js            # Helper functions
├── app.js                    # Express app setup
├── index.js                  # Entry point with graceful shutdown
└── counter.txt               # Counter storage
```

### Design Principles

- **Single Responsibility Principle**: Each module has a single, well-defined purpose
- **Open/Closed Principle**: Easy to extend without modifying existing code
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Clean Code**: Meaningful names, small functions, comprehensive documentation
- **Express.js Best Practices**: Proper middleware chain, error handling, and logging

## 🛠️ Requirements

- [Node.js](https://nodejs.org/en) (>= 20.x)
- [pnpm](https://pnpm.io/) (>= 8.x)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/montasim/github-readme-counter.git
   cd github-readme-counter
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the server**:
   ```bash
   pnpm start
   ```

   For development with auto-reload:
   ```bash
   pnpm dev
   ```

The server will start on the port specified in your environment variables or default to port 3000.

## 📡 API Endpoints

### Health Check

Check the service status and uptime:

```bash
GET /health
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-23T05:00:00.000Z",
  "uptime": 123.456
}
```

### Counter SVG

Get a dynamic SVG image with the visitor count:

```bash
GET /count.svg
```

**Query Parameters**:

| Parameter | Short | Description | Default |
|-----------|-------|-------------|---------|
| Background Color | `bg` | Hex code for background color | `000000` (black) |
| Text Color | `tc` | Hex code for text color | `EB008B` (magenta) |

> **Note**: For backward compatibility, the old parameter names (`backgroundColor` and `textColor`) are still supported. The new short names take precedence if both are provided.

**Examples**:

Default colors:
```bash
http://localhost:3000/count.svg
```

Custom colors (new parameters):
```bash
http://localhost:3000/count.svg?bg=FFFFFF&tc=0000FF
```

Custom colors (old parameters - still supported):
```bash
http://localhost:3000/count.svg?backgroundColor=FFFFFF&textColor=0000FF
```

Mixed parameters (new takes precedence):
```bash
http://localhost:3000/count.svg?bg=FFFFFF&textColor=0000FF
```

![Default Visitor Count](./default.png)
![Customized Visitor Count](./customized-example.png)

## 🎨 Customization

### Color Guidelines

- Provide hex codes **without** the `#` symbol (e.g., `FFFFFF`, not `#FFFFFF`)
- Use 6-digit hex codes (e.g., `000000`, `FFFFFF`, `EB008B`)
- Invalid or unsupported color values will revert to defaults

### Color Examples

| Color | Hex Code | Preview |
|-------|----------|---------|
| Black | `000000` | ⬛ |
| White | `FFFFFF` | ⬜ |
| Red | `FF0000` | 🟥 |
| Green | `00FF00` | 🟩 |
| Blue | `0000FF` | 🟦 |
| Magenta | `EB008B` | 💜 |
| Cyan | `00B8B5` | 💠 |

## 🧪 Testing

All features have been tested and verified:

✅ **Health Check Endpoint**
- Returns 200 status
- Includes service status, timestamp, and uptime

✅ **Counter Endpoint**
- Returns SVG image with incremented counter
- Default colors work correctly
- Custom colors apply properly

✅ **Query Parameters**
- New short parameters (`bg`, `tc`) work
- Old long parameters (`backgroundColor`, `textColor`) work
- Mixed parameters work (new takes precedence)
- No parameters use defaults

✅ **Error Handling**
- Invalid hex codes return 400 status
- Proper error messages displayed
- Error logging with stack traces

✅ **404 Handler**
- Undefined routes return 404 status
- Consistent 404 response format

✅ **Logging**
- All requests logged with timestamp and method
- All responses logged with status code and duration
- Color-coded status codes (green for 2xx, yellow for 4xx, red for 5xx)

## 🔧 Error Handling

The service implements comprehensive error handling:

- **400 Bad Request**: Invalid input (e.g., invalid hex color codes)
- **404 Not Found**: Route not found
- **500 Internal Server Error**: Unexpected server errors

All errors are logged with full stack traces for debugging.

## 📊 Logging

The service provides detailed logging:

- **Request Logging**: Timestamp, HTTP method, and path
- **Response Logging**: Status code and response duration
- **Error Logging**: Full error messages and stack traces
- **Color-coded Output**: Green for success, yellow for warnings, red for errors

## 🔄 Graceful Shutdown

The service handles termination signals properly:

- **SIGTERM**: Graceful shutdown on termination signal
- **SIGINT**: Graceful shutdown on interrupt signal (Ctrl+C)
- **Timeout**: Forces shutdown after 10 seconds if graceful shutdown fails
- **Cleanup**: Properly closes server connections

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTION.md](./CONTRIBUTION.md) for details on:
- How to contribute
- Coding style guidelines
- Commit message conventions
- Code review process

## 📖 Author

<table>
  <tr>
    <td  align=center>
        <img src="https://avatars.githubusercontent.com/u/95298623?v=4" width="100px" alt="Moon">
        <a href="https://github.com/montasim">
          <br>
            Ｍ♢ＮＴΛＳＩＭ
          </br>
        </a>
    </td>
  </tr>
</table>

## 👥 Contributors

[![Contributors Display](https://badges.pufler.dev/contributors/montasim/github-readme-counter?size=50&padding=5&perRow=10&bots=true)](https://badges.pufler.dev)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

1. [sagar-viradiya](https://github.com/sagar-viradiya/sagar-viradiya)
2. [pufler.dev/badge-it/](https://pufler.dev/badge-it/)
3. [github-readme-counter](https://github.com/iamskok/github-readme-counter)

## 📚 Additional Documentation

- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Details on query parameter simplification
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Complete refactoring documentation
- [SECURITY.md](./SECURITY.md) - Security policy and reporting
- [CONTRIBUTION.md](./CONTRIBUTION.md) - Contribution guidelines

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🍴 Forking and contributing
- 📢 Sharing with others

---

Built with ❤️ using Express.js, following Clean Code principles and SOLID design patterns.
