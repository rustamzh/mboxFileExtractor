# .mbox File Extarctor

Small utility to extract files from .mbox files. .mbox files can be exported from Gmail. Utility extracts base64 encoded files from .mbox, enumerates and saves them  in one folder. No checks performed for file extension.  Might not work with multipart emails.

# Usage

- First install external dependencies:
`
    npm install
`
- Then either `cat filename.mbox | node index.js` or `node index.js filename.mbox`

- Files will be extracted into `./outputs/` directory.

# Licence
The MIT License (MIT)

Copyright © 2018 Rustam Zhumagambetov