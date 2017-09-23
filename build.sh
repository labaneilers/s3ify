npm install
rm -rf output
rm s3ify.zip
mkdir output
cp -r node_modules output/node_modules
cp ./*.js ./output
cp ./*.json ./output
cd output 
zip -r ../s3ify.zip *