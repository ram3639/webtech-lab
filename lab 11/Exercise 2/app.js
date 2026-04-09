const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.txt');

console.log('--- Node.js File System Operations ---');

// 1. Create and Write to a file
fs.writeFile(filePath, 'Hello! This is a file created using Node.js fs module.', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('1. File created successfully using fs.writeFile()');

    // 2. Read the contents of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('2. File content read using fs.readFile():');
        console.log('   > ' + data);

        // 3. Append data to the file
        const additionalText = '\nThis data was appended using fs.appendFile().';
        fs.appendFile(filePath, additionalText, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
                return;
            }
            console.log('3. Data appended successfully using fs.appendFile()');

            // 4. Read the file again to show changes
            fs.readFile(filePath, 'utf8', (err, updatedData) => {
                if (err) {
                    console.error('Error reading updated file:', err);
                    return;
                }
                console.log('4. Updated file content:');
                console.log('   > ' + updatedData);

                // 5. Delete the file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('5. File deleted successfully using fs.unlink()');
                    console.log('--- All operations completed successfully ---');
                });
            });
        });
    });
});
