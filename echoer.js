const login = require("facebook-chat-api");
var norepeat=false
var count=0
login({email: "", password: ""}, (err, api) => {
    if(err) return console.error(err);
    var date = new Date(Date.now())
    if(date.getHours()==9){
	if(!norepeat){
		api.sendMessage("Good morning, BLANK! What's up? :)", "")
		norepeat=true
	}
    }
    else if(date.getHours()==0){
	if(!norepeat){
		api.sendMessage("Hi, BLANK! How was your day? :)", "")
		norepeat=true
	}
    }
    else{
	norepeat=false
    }
    api.listen((err, message) => {
        if(!message.isGroup && message.threadID!="" && message.threadID!=""){
	    api.sendMessage("This is an autogenerated message: I no longer respond to nor view direct Messenger messages. Please instead use my phone number or my email address for communication, or if this message is for a group, add me to the group chat.", message.threadID);
	    api.markAsRead(message.threadID);
	}
	else if(!message.isGroup && message.threadID==""){
	    api.sendMessage("This is an autogenerated message: I no longer respond to nor view direct Messenger messages, especially from you. Please do not contact me again, unless it is sufficiently important, in which case direct messages to my email address, or the message is for a group, in which case add me to the group chat.", message.threadID);
	    api.markAsRead(message.threadID);
	}
	else if(!message.isGroup){
	    api.markAsRead(message.threadID);
	    api.sendMessage("Ok.", message.threadID);
	    api.setMessageReaction(":like:",message.messageID);
	    api.changeThreadColor(api.threadColors[Object.keys(api.threadColors)[count%(Object.keys(api.threadColors).length)]],message.threadID,(err)=>{if(err) throw err;count=count+1});
	}
    });
});
