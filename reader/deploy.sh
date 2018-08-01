color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"

echo
echo "${color}Uglify and upload to Digital Ocean${reset}" 
if [ "$1" = "--uglify" ]
then
    uglifyjs ${NGINX_LOCAL}Main.js -mc 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9"' -o ${NGINX_LOCAL}Main.min.js
    scp -r ${NGINX_LOCAL}Main.min.js root@138.197.81.6:${NGINX_REMOTE}
    scp -r ${DIST_LOCAL}index.html root@138.197.81.6:${NGINX_REMOTE}
else
    echo "${color}Upload to Digital Ocean${reset}"
    scp -r ${NGINX_LOCAL}Main.js root@138.197.81.6:${NGINX_REMOTE}
    scp -r ${NGINX_LOCAL}index.html root@138.197.81.6:${NGINX_REMOTE}
fi

# echo
# echo "${color}Upload to Zeit.co ... ${reset}"
# now --public ./dist

# echo
# echo "${color}Upload to Digital Ocean ...${reset}"
# scp -r ./dist/Main.min.js root@138.197.81.6:/var/www/html/
# scp -r ./dist/index.html root@138.197.81.6:/var/www/html/
