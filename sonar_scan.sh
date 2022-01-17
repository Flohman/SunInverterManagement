#/bin/sh
set -e

if ! [ -x "$(command -v sonar-scanner)" ]; then
    echo 'Error: sonar-scanner is not installed.' >&2
    exit 1
fi

#VERSION="$(grep 'version' package.json | cut -d '"' -f4 | tr -d '[[:space:]]')"

echo "wait on http://localhost:9000"
wait-on http://localhost:9000
wait-on -d=20000 http://localhost:9000

npm run test:jest-cov

sonar-scanner -D sonar.projectKey=ProjectTemplateExample -D sonar.javascript.lcov.reportPaths=./coverage/lcov.info -D sonar.exclusions=*.js,test/**/*

echo "scan done: http://localhost:9000"