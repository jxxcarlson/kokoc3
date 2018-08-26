color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"
COMPILER="elm"


echo
echo "${color}Compile App${reset}"
if [ "$1" = "--debug" ]
then
echo "${color}Compile using 0.19${reset}"
time ${COMPILER} make --debug ./src/Main.elm --output ${NGINX_LOCAL}Main.js
else
echo "${color}Compile using 0.19 --optimized${reset}"
time ${COMPILER} make --optimize ./src/Main.elm --output ${NGINX_LOCAL}Main.js
fi

echo "${color}Copy 'index.html' to /usr/local/var/www/ and restart nginx${reset}"
cp ./index.html ${NGINX_LOCAL} 
 

nginx -s reload

