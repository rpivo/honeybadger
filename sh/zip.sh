npm run clean
npm run build
mv dist/last-published.js dist/index.js
zip -j dist/badges-last-published.zip dist/index.js
rm dist/*.js
