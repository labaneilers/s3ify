npm install
rm -rf output
rm s3ify.zip

mkdir output
cp -r node_modules output/node_modules
cp ./*.js ./output
cp ./*.json ./output

cd output 
zip -r ../s3ify.zip *
cd ../

aws lambda update-function-code \
--function-name S3ifyMPUrls  \
--region eu-west-1 \
--zip-file fileb://s3ify.zip \
--publish