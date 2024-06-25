const fs = require("fs");
const path = require("path");
const countImageService = require("./countImageService");

const countController = (req, res) => {
    let counter = fs.readFileSync(path.join(__dirname, "counter.txt"), 'utf8');

    counter++;

    fs.writeFileSync(path.join(__dirname, "counter.txt"), counter.toString());

    // Get colors from URL parameters, use default if not specified
    // Example: /count.svg?backgroundColor=FFFFFF&textColor=000000
    const backgroundColor = req.query.backgroundColor ? req.query.backgroundColor : '000000';  // Default to black
    const textColor = req.query.textColor || 'EB008B';  // Default to magenta

    res.set({
        'Content-Type': 'image/svg+xml',
        "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"
    });

    // Send the generated SVG as the result
    res.send(countImageService(counter, `#${backgroundColor}`, `#${textColor}`));
};

module.exports = countController;
