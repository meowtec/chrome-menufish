var btn = document.getElementById('install-button')
var build = 8
var version = '1.1.7'
var lastBuild = Number(btn.getAttribute('data-build'))
var lastVersion = btn.getAttribute('data-version')

if(build === lastBuild){
  btn.innerHTML = '已安装'
  btn.disabled = true
}else if(build<lastBuild{
  btn.innerHTML = '升级到最新版：v' + lastVersion
}

