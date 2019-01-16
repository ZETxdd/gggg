const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("pornhub.com | .serverinfo", {type: "WATCHING"});


    //bot.user.setGame("PRACE TRWAJĄ!")
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Nie można znaleść gracza.")
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Zgłoszenia:")
    .setColor("#15f153")
    .addField("Zgłoszony Gracz:", `${rUser} z ID: ${rUser.id}`)
    .addField("Zgłosozny przez:", `${message.author} z ID: ${message.author.id}`)
    .addField("Kanał:", message.channel)
    .addField("Na czas:", message.createdAt)
    .addField("Powód:", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Nie można znaleść kanału ze zgłoszeniami.")

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
    }

    if(cmd === `${prefix}serverinfo`){
        
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Serwer jest bardzo fajny :).")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Królestwo Niebieskie", message.guild.name)
        .addField("Stworzony:", message.guild.createdAt)
        .addField("Dołączyłeś:", message.member.joinedAt)
        .addField("Liczba graczy:", message.guild.memberCount);


        return message.channel.send(serverembed);
    }

    if(cmd === `${prefix}kick`){
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Nie ma takiego gracza.");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("NIE MOZNA TEGO ZROBIĆ!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ten gracz nie może zostać wyrzucony.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Gracz:", `${kUser} z ID ${kUser.id}`)
        .addField("Wyrzucony przez:", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Wyrzucony z kanału:", message.channel)
        .addField("Czas", message.createdAt)
        .addField("Powód", kReason);
    
        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if(!kickChannel) return message.channel.send("Can't find incidents channel.");
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
      }


    if(cmd == `${prefix}bot`){
        
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("TO JEST PRZYJAZNY BOT.")
        .setColor("#0800ff")
        .setThumbnail(bicon)
        .addField("Informacja o bocie :)", bot.user.username)
        .addField("Stworzony:", bot.user.createdAt)

        return message.channel.send(botembed);
    }

})

bot.login(botconfig.token);