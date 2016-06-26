echo "Removing the docs folder for rebuilding"
sleep 2

echo "rm -fr docs"
rm -fr docs

echo "Generating documentation with JSDoc"
echo "./node_modules/.bin/jsdoc -c conf.json"
./node_modules/.bin/jsdoc -c conf.json
