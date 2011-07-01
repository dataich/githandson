# 何をするか
- Node.jsアプリ（DotCloud上）と、GitHubリポジトリとの連携で分散リポジトリでの共同作業の楽しさを感じてもらいます。
- GitHubリポジトリ（https://github.com/dataich/githandson-html/）にPushすると、Service Hookを使って、Node.jsアプリにPOSTで通知します。
- Node.jsアプリは最新のindex.htmlをGitHubリポジトリから取得し、ページをリアルタイム（Socket.IO）で更新します。

# イメージ
DotCloud(githandson) <--> githandson-html <-- Collaborators

# URL
http://df647abd.dotcloud.com/
