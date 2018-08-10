color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"

echo

if [ "$1" = "--local" ]
then
    echo "${color}Uglify and deploy locally to nginx${reset}" 
    uglifyjs ${NGINX_LOCAL}Main.js -mc 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9"' -o ${NGINX_LOCAL}Main.min.js
    sed 's/Main.js/Main.min.js/' >index.html ${NGINX_LOCAL}index.html
else
    echo "${color}Uglify and deploy to Digital Ocean${reset}"
    uglifyjs ${NGINX_LOCAL}Main.js -mc 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9"' -o ${NGINX_LOCAL}Main.min.js
    scp -r ${NGINX_LOCAL}Main.min.js root@138.197.81.6:${NGINX_REMOTE}
    sed 's/Main.js/Main.min.js/' >index.html ${NGINX_LOCAL}index.html
    scp -r ${NGINX_LOCAL}index.html root@138.197.81.6:${NGINX_REMOTE}index.html
    cp  index.html ${NGINX_LOCAL}
fi

