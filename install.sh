#START in ROOT!
#update apt and upgrade
apt update 
apt upgrade
#step 1: git clone repo https://github.com/github/training-kit.git
git clone https://github.com/Newtbot/CRunnerDiscordbot

#getting latest node 
apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

#install npm 
apt install npm

#npm start (to install dependency) MAKE SURE U HAVE PACKAGE-LOG N PACKAGE.JSON
#remember to cd to repo folder
cd CRunnerDiscordbot
npm install

#creating .env
touch .env
#fill .env file accordingly

#creating service file
wget -q https://github.com/Newtbot/CRunnerDiscordbot/blob/main/CRunnerDiscordBot.service -O /etc/systemd/system/CRunnerDiscordBot.service
#fill services file accordingly to sample (optional pls check directory)

#start service file
systemctl start CrunnerDiscordBot.service
systemctl enable CrunnerDiscordBot.service





