rm -rf ../fishmenu ../fishmenu.zip
mkdir ../fishmenu
cp -r ./manifest.json ./options ./background ./assets ../fishmenu
7z a -tzip ../fishmenu.zip ../fishmenu