color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

NGINX_LOCAL="/usr/local/var/www/"
NGINX_REMOTE="/var/www/html/"
DIST_LOCAL="./dist/"
REMOTE_HOST="138.197.81.6"
COMPILER="elm"


# https://guide.elm-lang.org/optimization/asset_size.html

echo

if [ "$1" = "--local" ]
then
    echo "${color}Configure ...${reset}"
    cat ../src/Configuration.elm | sed 's/http:\/\/localhost:4000/https:\/\/nshost.herokuapp.com/' | sed 's/http:\/\/localhost:8080/https:\/\/knode.io/' > ../src/Configuration2.elm
    cp ../src/Configuration2.elm ../src/Configuration.elm
    rm ../src/Configuration2.elm
    echo "${color}Compile using 0.19 --optimized${reset}"
    time ${COMPILER} make --optimize ./src/Main.elm --output ${NGINX_LOCAL}Main.js

    echo "${color}Uglify and deploy to dist-local${reset}"
    time uglifyjs ${NGINX_LOCAL}Main.js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output=${NGINX_LOCAL}Main.min.js
    sed 's/Main.js/Main.min.js/' ./index.html > ${NGINX_LOCAL}index.html
    echo "${color}Done!${reset}"
    nginx -s reload
else
    echo "${color}Configure ...${reset}"
    # Set urls of host and client
    cat ../src/Configuration.elm | sed 's/http:\/\/localhost:4000/https:\/\/nshost.herokuapp.com/' | sed 's/http:\/\/localhost:8080/https:\/\/knode.io/' > ../src/Configuration2.elm
    cp ../src/Configuration2.elm ../src/Configuration.elm
    rm ../src/Configuration2.elm

    # Compile app
    echo "${color}Compile using 0.19 --optimized${reset}"
    time ${COMPILER} make --optimize ./src/Main.elm --output ${NGINX_LOCAL}Main.js

    # Prepare assets for upload
    echo "${color}Uglify and deploy to Digital Ocean${reset}"
    time uglifyjs ${NGINX_LOCAL}Main.js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output=${NGINX_LOCAL}Main.min.js
    scp -r ${NGINX_LOCAL}Main.min.js root@138.197.81.6:${NGINX_REMOTE}
    echo "Start sed on index"
    sed 's/Main.js/Main.min.js/' ./index.html > ${NGINX_LOCAL}index.html
    # Upload assets
    echo "Upload assets"
    scp -r ${NGINX_LOCAL}index.html root@138.197.81.6:${NGINX_REMOTE}index.html
    scp -r assets/asciidoc.js root@138.197.81.6:${NGINX_REMOTE}/assets
    scp -r assets/custom-element-config.js root@138.197.81.6:${NGINX_REMOTE}/assets
    scp -r assets/math-text.js root@138.197.81.6:${NGINX_REMOTE}/assets
    scp -r assets/image_uploader.js root@138.197.81.6:${NGINX_REMOTE}/assets
    scp -r assets/outside.js root@138.197.81.6:${NGINX_REMOTE}/assets
    scp -r assets/style.css root@138.197.81.6:${NGINX_REMOTE}/assets
    echo "${color}Done!${reset}"
fi


# scp  /usr/local/var/www/index.html root@:/var/www/html/index.html
