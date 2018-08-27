color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"
COMPILER="elm"

echo

if [ "$1" = "--local" ]
then
    echo "${color}Configure ...${reset}"
    cat ../src/Configuration.elm | sed 's/http:\/\/localhost:4000/https:\/\/nshost.herokuapp.com/' | sed 's/http:\/\/localhost:8080/https:\/\/knode.io/' > ../src/Configuration2.elm 
    cp ../src/Configuration2.elm ../src/Configuration.elm 
    rm ../src/Configuration2.elm 
    echo "${color}Compile using 0.19 --optimized${reset}"
    time ${COMPILER} make --optimize ./src/Main.elm --output ${NGINX_LOCAL}Main.js
    
    cp ./index.html ${NGINX_LOCAL}index.html
    echo "${color}Done!${reset}"
    nginx -s reload
else
    echo "${color}Configure ...${reset}"
    cat ../src/Configuration.elm | sed 's/http:\/\/localhost:4000/https:\/\/nshost.herokuapp.com/' | sed 's/http:\/\/localhost:8080/https:\/\/knode.io/' > ../src/Configuration2.elm 
    cp ../src/Configuration2.elm ../src/Configuration.elm 
    rm ../src/Configuration2.elm 
    echo "${color}Compile using 0.19 --optimized${reset}"
    time ${COMPILER} make --optimize ./src/Main.elm --output ${NGINX_LOCAL}Main.js
    
    scp -r ${NGINX_LOCAL}Main.js root@138.197.81.6:${NGINX_REMOTE}
    cp  ./index.html ${NGINX_LOCAL}index.html
    scp -r ${NGINX_LOCAL}index.html root@138.197.81.6:${NGINX_REMOTE}index.html
    cp  index.html ${NGINX_LOCAL}
    echo "${color}Done!${reset}"
fi



