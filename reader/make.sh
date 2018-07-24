color=`tput setaf 48`
magenta=`tput setaf 5`
reset=`tput setaf 7`

echo
echo "${color}Compile reader${reset}"
if [ "$1" = "--debug" ]
then
/Users/carlson/Downloads/2/elm make ./src/Reader.elm --output /usr/local/var/www/Main.js
else
/Users/carlson/Downloads/2/elm make --optimize ./src/Reader.elm --output /usr/local/var/www/Main.js
fi

if [ "$1" = "--r666" ]
then
echo
echo "${color}Start web server on port 8080${reset}"
http-server ./dist
fi



echo "${color}Copy 'index.html' to /usr/local/var/www/ and restart nginx${reset}"
nginx -s stop
cp ./dist/index.html /usr/local/var/www/        
nginx
  