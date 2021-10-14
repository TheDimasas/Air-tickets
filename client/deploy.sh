#!/usr/bin/env sh

set -e

npm run build

xcopy ..'\'server'\'documentation dist'\'documentation'\'/E/H/C/I

cd dist

git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:TheDimasas/airtickets.git master:gh-pages

cd -
