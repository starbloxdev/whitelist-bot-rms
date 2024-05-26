# Instructions for Whitelist bot by ThomasH (mostly rescripted by James & Apple)
// FileName: README.md
// FileDesc: A document full of important information regarding ThomasH's discord bot.
// FileAuthors: thatsjames_, gogglemaps (Discord)

# For configuration information, read config_information.png

To use, simply change all of config.json to your required needs.
To add a product, go to Products.json and change. Make sure to change it in the whitelists folder as well.
To add commands, duplicate test.js in the commands folder and change it to your required needs.
If you want to change the DirectPOS logos, make sure to remove DirectPOS or any of that stuff and change that by using CMD/CTRL +
SHIFT + F and then search up 'DirectPOS'.
After you have done all of this, follow all of these following steps:

1. If you have already invited your application/bot, kick it.
2. Go to your application's page at https://discord.com/developers/applications and select your application.
3. Click Oauth2 in your sidebar.
4. Select the following scopes:
- applications.commands
- bot
5. For permissions, simply click Administrator.
6. Copy the invite link and invite the application to your Discord server.
7. Once you have invited the bot and it has joined your server, turn it on & after 5 minutes (only when it is setting up), run
/setup. For groupid, put your Roblox group ID in. For token, follow 'How do I get my Roblox holder's token?' unless you know how to do this process.
8. Once you have finished this, you are now good to use your bot whenever you want!


### F.A.Q. (Frequently Asked Questions)

# It says Failed to login to roblox account: Error: Error: You are not logged in.
If it says this, your token to your Roblox holder's account has expired. Follow 'How do I change my token if someone else has logged in?' to fix this issue.

# It says something about not being able to get a product in this guild
If this happens, you may have not setup the Products.json configuration properly. Make sure the 'Guild' variable is your guild id unless you are using multiple servers for the bot. If you are, make sure you are running the command in the correct server. If this keeps happening, make sure to set the 'Role' variable to your product's role.

# How do I get my Roblox holder's token?
It's simple. Install EditThisCookie chrome extension (https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg). Go to the Roblox home page and DO NOT LOG OUT. Instead, click the settings cog > Switch Accounts > Add Account. Add your holder account. If this is a shared account, do not let anyone you've shared this account with log into it. If someone did log into the account, follow 'How do I change my token if someone else has logged in?'. Congrats, you have gotten your token!

# How do I change my token if someone else has logged in?
First, repeat the steps in 'How do I get my Roblox holder's token'. Next, go into the servers folder and click the JSON code named YOUR_GUILD_ID.json. It should look like this: 1079980306448253041.json. After that, change the Token variable to your new token. Congratulations, you have reset your token! You may now use the bot as normal now.

# Written by thatsjames_ (Discord).
# Special thanks to gogglemaps (Discord) for help along the way on most of the scripts & tons of help.

# MAKE SURE TO INSTALL NODE.JS
# ONCE YOU DID THAT, RUN THE FOLLOWING SEPARATELY TO INSTALL REQUIRED MODULES
npm install @discordjs/builders
npm install @discordjs/rest
npm install bloxlink-api
npm install common-tags
npm install discord-api-types
npm install discord.js
npm install express
npm install express-session
npm install fs
npm install noblox.js
npm install node
npm install request
npm install request-promise
npm install request-promise-any
npm install util