color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"
COMPILER="elm"


echo
echo "${color}Compile reader${reset}"
if [ "$1" = "--debug" ]
then
echo "${color}Compile using 0.19${reset}"
${COMPILER} make --debug ./src/Reader.elm --output ${NGINX_LOCAL}Main.js
else
echo "${color}Compile using 0.19 --optimized${reset}"
${COMPILER} make --optimize ./src/Reader.elm --output ${NGINX_LOCAL}Main.js
fi

echo "${color}Copy 'index.html' to /usr/local/var/www/ and restart nginx${reset}"
cp ./index.html ${NGINX_LOCAL} 
 

nginx -s reload

