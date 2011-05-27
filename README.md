# 何をするか
分散リポジトリでの共同作業の楽しさを感じていただくために、DotCloud（Node.js）とGitHubを連携してPushすると同時にDotCloudのページを更新する。

# どう実現する
1. CollaboratorsがGitHub（https://github.com/dataich/githandson-html/）にPushする。
2. GitHub側でService Hookを使ってPushがあったことをDotCloudにPost伝える。
3. DotCloudでGitHubリポジトリのindex.htmlを取得し、ページをリアルタイムで更新する。

#イメージ
DotCloud(githandson) <-> githandson-html <- Collaborators