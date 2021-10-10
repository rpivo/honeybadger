npm run clean
npm run build
zip -j dist/badges-last-published.zip dist/last-published.js
rm dist/last-published.js
