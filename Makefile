build:
	npx lessc ./options/css/index.less > ./options/css/index.css

package:
	npm run build
	rm -rf _build && mkdir -p _build/fishmenu
	cp -r ./manifest.json ./options ./background ./assets ./content _build/fishmenu
	7z a -tzip ./_build/fishmenu.zip ./_build/fishmenu
	rm -rf ./_build/fishmenu

lint:
	eslint background content options/js
# 开发完毕
# 版本升级（version 和 build），manifest.json 和 options.js 和 content/index.js
# 打包上传
# 下载最新crx
# crx 分别复制到 fish.cateyes.blue 和 github 项目
# 提交 github
# 更新 fish.cateyes.blue 下的 version.json 和 index.html 中的版本号
