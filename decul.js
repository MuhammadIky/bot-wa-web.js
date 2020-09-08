const fs = require("fs"); 
const moment = require("moment");
const qrcode = require("qrcode-terminal"); 
const { Client, MessageMedia } = require("whatsapp-web.js"); 
const mqtt = require("mqtt"); 
const listen = mqtt.connect("mqtt://test.mosquitto.org"); 
const fetch = require("node-fetch"); 
const User = require("./user.js"); 
const Userup = require("./userupdate.js"); 
const delay = require("delay"); 
const corona = require("./CoronaService/covid19.js");
const axios = require('axios');


let urlen = require("urlencode"); 
const puppeteer = require("puppeteer"); 
const cheerio = require("cheerio"); 
var https = require('follow-redirects').https;
const version="v1.0.0"
const youtubedl = require('youtube-dl');
const { YouTube } = require('popyt');
const youtube = new YouTube('APIKEY');




const SESSION_FILE_PATH = "./session.json";
// file is included here
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}
client = new Client({	  
    
	     puppeteer: {
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        headless: true,
		args: [
      "--log-level=3", // fatal only
   
      "--no-default-browser-check",
      "--disable-infobars",
      "--disable-web-security",
      "--disable-site-isolation-trials",
      "--no-experiments",
      "--ignore-gpu-blacklist",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
    
      "--disable-extensions",
      "--disable-default-apps",
      "--enable-features=NetworkService",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    
      "--no-first-run",
      "--no-zygote"
    ]
		
    },	      
    session: sessionCfg
});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
    console.log('READY');
    console.log("WhatsApp Web v", await client.getWWebVersion());
    console.log("WWebJS v", require("whatsapp-web.js").version);
});
    var recentcmd = new Set();
    var fspamm=new Set();
    var sban= new Set();
    var stickerspam=new Set();
    var stp=new Set();
    var loaded=0;
    var counter=0;

client.on('message', async msg => {
    
   // console.log('MESSAGE RECEIVED', msg);
	const chat = await msg.getChat();
	const users = await msg.getContact()
	const dariGC = msg['author']
    const dariPC = msg['from']
	const ownerbot = "6285285593597"
	const botTol2 = () => {
        msg.reply(`*⚠️* Maaf, fitur ini hanya untuk 'Group Chat'.`)
        return
    }
    const botTo1 = () => {
        msg.reply(`*⚠️* Maaf, Anda bukan owner Bot!`)
		return
    }
	const botGrup = () => {
        msg.reply(`*⚠️* Maaf, Tidak bisa digunakan di dalam group!`)
        return
    }
	
	 
		
		
   
	//console.log(` ${chat} 
	//participant
	//`)
	 
	  if(msg.body.startsWith("P") && counter<=4){
        counter++;
        const usr = msg.author || msg.from
        
        
        if(recentcmd.has(usr) || sban.has(usr)){
        if(!(fspamm.has(usr) || (sban.has(usr)))){
        msg.reply('Jangan spam, nanti aku cuekin😤');
        fspamm.add(usr);
        var keyToFind = `${usr}`;
    
        
}
    else if(!(sban.has(usr))){
			
		//var pesan = msg.reply("Anda selesai diban selama *15 Menit*");
        msg.reply(`Fix! Kamu aku cuekin 15 menit 😡`);
        sban.add(usr);
        }
    
    
        }
        else{
	    if (msg.body == "bot" ||
    msg.body == "Bot" || msg.body == "p" || msg.body == "P" || msg.body == "hai") {
    // Send a new message to the same chat
    client.sendMessage(msg.from, 
	`Salam yang bener kak...
ketik >menu untuk melihat list
ketik >update untuk melihat update`);
	}
	    setTimeout(()=>{
    counter--;},2000)
recentcmd.add(usr);
    setTimeout(() =>{
    recentcmd.delete(usr);
    fspamm.delete(usr);
    },5000);
    
    setTimeout(() =>{
    sban.delete(usr);
	
    
    },900000);


            
    
    
    
    
               
    }} 
    else{setTimeout(()=>{counter=0;},15000, pesan);
	}
		 if (msg.body == "Assalamualaikum" || msg.body == "assalamu'alaikum" || msg.body == "assalamualaikum" || msg.body == "mikum") {
     client.sendMessage(msg.from, `Waalaikumusalam wr.wb`);
	  }
	  

else if (msg.body.startsWith("#baca ")) {
    const newStatus = msg.body.split(" ")[1];
	if (chat.isGroup) {
      msg.reply("Mohon maaf, gunakan perintah ini di chat pribadi.");
    } else {
    const fetch = require("node-fetch");
    let url =
      "https://al-quran-8d642.firebaseio.com/surat/" +
      newStatus +
      ".json?print=pretty";

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resJSON => {
        resJSON.forEach(item => {
          client.sendMessage(
            msg.from,
			`Ayat *${item.nomor}*, :  
       *${item.ar}*
  ----------------------------------
  Artinya : 
       _${item.id}_`
	   );
	});
	});
	}
}
	
	 
	 else if(msg.body.startsWith(">") && counter<=4){
        counter++;
        const usr = msg.author || msg.from
        
        
        if(recentcmd.has(usr) || sban.has(usr)){
        if(!(fspamm.has(usr) || (sban.has(usr)))){
        msg.reply('Jangan spam, nanti aku cuekin😤');
        fspamm.add(usr);
        var keyToFind = `${usr}`;
    
        
}
    else if(!(sban.has(usr))){
			
		var pesan = msg.reply("Anda selesai diban selama *15 Menit*");
        msg.reply(`Fix! Kamu aku cuekin 15 menit 😡`);
        sban.add(usr);
        }
    
    
        }
        else{
	 

       if (msg.body.startsWith('>subject ')) {
        // Change the group subject
		    
		let chat = await msg.getChat();
		
        if (chat.isGroup) {
			
			if (dariGC.replace('@c.us', '') == chat.owner.user) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
			msg.reply(`Subject berhasil diubah ke: *${newSubject}*`);
				} else {
                botTol()
            }
			
        } else {
            botTol2()
        }
	  }
	  
	

// GANTI DESKRIPSI Grup
 else if (msg.body.startsWith('>deskripsi ')) {
	 
        // Change the group description
        let chat = await msg.getChat();
        if (chat.isGroup) {
			if (dariGC.replace('@c.us', '') == chat.owner.user ) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
			msg.reply(`Deskripsi berhasil diubah ke *_${newDescription}_*`);
        } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('>getmember ')) {
        const chat = await msg.getChat();
		const teks = msg.body.split(" ")[1];
		if(teks.length > 200){ // check longness of text, because otherways google translate will give me a empty file
 msg.reply("Terlalu panjang .. disini gabisa lebih dari 200 karakter teks")
}else{

        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
			text += `${teks} `;
            text += `@${participant.id.user}`;
			text += "\n";
        }

        chat.sendMessage(text, { mentions });
}
		
		} else if (msg.body.startsWith('>getmember')) {
        const chat = await msg.getChat();

        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
			text += "Hai! ";
            text += ` @${participant.id.user}`;
			text += "\n";
        }

        chat.sendMessage(text, { mentions });
    } else if (msg.body.startsWith('>pm ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                const contact = await msg.getContact();
                const title = msg.mentionedIds[0]
                chat.promoteParticipants([`${title}`])
                chat.sendMessage(`✨ *${title.replace('@c.us', '')}* Selamat! sekarang anda adalah admin sob 🔥`)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('>add ')) {
		let chat = await msg.getChat();
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.body.slice(5)
                if (title.indexOf('62') == -1) {
                    chat.addParticipants([`${title.replace('0', '62')}@c.us`])
                    msg.reply(`*~* Permintaan diterima! *${title}* akan masuk kedalam grup, jika tidak, kemungkinan no salah/settingan invite dimatikan.️`);
                } else {
                    msg.reply('*~* Format nomor harus 08xxxxxxxx')
                }
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
		
	} else if (msg.body.startsWith('>status ')) {
        const newStatus = msg.body.split(' ')[1];
		if (chat.isGroup) {
               msg.reply("*⚠️* Maaf, perintah ini tidak bisa digunakan di dalam grup!");
               }else{
            if (dariPC.replace('@c.us', '') == ownerbot ) {
        await client.setStatus(newStatus);
        msg.reply(`Status bot was updated to *${newStatus}*`);
		} else {
                    botOwn()
                }
			   }
			   } else if (msg.body == '>lokasi') {
				   const { hasMedia, hasQuotedMsg, isForwarded, body, type, from, author, mentionedIds, location } = msg
				 if (hasQuotedMsg) {
					 const getAll = require('./CoronaService/location')
                const quotedMsg = await msg.getQuotedMessage()
                if (quotedMsg.location !== undefined) {
                    console.log(` Request Status Zona (${quotedMsg.location.latitude},${quotedMsg.location.longitude}).`)
                    const zoneStatus = await getAll(quotedMsg.location.latitude, quotedMsg.location.longitude)
                    if (zoneStatus.kode == 200) {
                        let data = ''
                        for (let i = 0; i < zoneStatus.data.length; i++) {
                            const x = zoneStatus.data[i]
                            let zone = ''
                            if (x.zone == 'green') zone = 'Hijau* (Aman) \n'
                            if (x.zone == 'red') zone = 'Merah* (Bahaya) \n'
                            if (x.zone == 'yellow') zone = 'Kuning* (Waspada) \n'
                            data += `${i + 1}. Kel. *${x.region}* Berstatus *Zona ${zone}`
                        }
						const teks = `Lokasimu: https://www.google.com/maps/@${quotedMsg.location.latitude},${quotedMsg.location.longitude}`
						client.sendMessage(from, teks)
                        const text = `*CEK LOKASI*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${data}`
                        client.sendMessage(from, text)
                    } else {
                        client.sendMessage(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
                    }
                }
            } else {
                const text = '*CEK LOKASI COVID-19*\nBerikut cara untuk cek lokasimu: \n1. Kirimkan lokasimu\n2. Balas dengan kata >lokasi, lokasi yang kamu kirim tadi (klik & tahan chat lokasimu lalu pilih balas)\n3. Kamu akan mendapat informasi mengenai lokasi yang kamu kirim\n\n Jika kurang jelas silahkan lihat gambar dibawah ini.'
                await client.sendMessage(from, text)
                const media = MessageMedia.fromFilePath('./CoronaService/location.jpg');
                await client.sendMessage(from, media)
            }
        

} else if (msg.body.startsWith('>kick ')) {
		let chat = await msg.getChat();
		const { hasMedia, hasQuotedMsg, isForwarded, body, type, from, author, mentionedIds, location } = msg
		const isGroupMsg = from.includes('@c.us')
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.mentionedIds
				const contact = await msg.getContact();
				const teks = msg.body.split("-")[1];
				//if(typeof teks === "undefined" || teks === "-");
				const sender = isGroupMsg ? author : `${title}`
                chat.removeParticipants([...title])
                // console.log([...title]);
				client.sendMessage(sender, `Hi *${title}* Anda telah di kick dari group *${chat.name}*. 
Dikick oleh: *${contact.number}*
Alasan: "${teks}"`);
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
		} else if (msg.body.startsWith('>anjing')) {
			let chat = await msg.getChat();
			const { hasMedia, hasQuotedMsg, isForwarded, body, type, from, author, mentionedIds, location } = msg
			if (chat.isGroup) {
				let title = msg.from
				chat.removeParticipants([...title])
				msg.reply("Jangan toxic");
				
				        } else {
            botTol2()
        }
				
	} else if (msg.body.startsWith('>kick ')) {
		let chat = await msg.getChat();
		const { hasMedia, hasQuotedMsg, isForwarded, body, type, from, author, mentionedIds, location } = msg
		const isGroupMsg = from.includes('@c.us')
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user) {
                let title = msg.mentionedIds
				const contact = await msg.getContact();
				//if(typeof teks === "undefined" || teks === "-");
				const sender = isGroupMsg ? author : `${title}`
                chat.removeParticipants([...title])
                // console.log([...title]);
				client.sendMessage(sender, `Hi *${title}* Anda telah di kick dari group *${chat.name}*. 
Dikick oleh: *${contact.number}*
Tidak ada alasan.`);
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
	}
     else if (msg.body == '>owner') {
        if (chat.isGroup) {
            msg.reply(JSON.stringify({
                owner: chat.owner.user
            }))
        } else {
            botTol2()
        }
	} else if (msg.body == ">leave") {
    // Leave the group
    if (chat.isGroup) {
		if (dariGC.replace('@c.us', '') == chat.owner.user) {
      chat.leave();
    } else {
      botTol()
            }
        } else {
            botTol2()
        }
		
	}
	 else if (msg.body == ">revoke") {
    // Leave the group
    if (chat.isGroup) {
		if (dariGC.replace('@c.us', '') == chat.owner.user) {
      chat.revokeInvite();
	  const inviteLink = await chat.getInviteCode();
		client.sendMessage(msg.from, `Link grup berhasil diubah ke:
https://chat.whatsapp.com/${inviteLink}`);
    } else {
      botTol()
            }
        } else {
            botTol2()
        }
	
	} else if (msg.body == ">linkgrup") {
    // Leave the group
    if (chat.isGroup) {
		if (dariGC.replace('@c.us', '')) {
      const inviteLink = await chat.getInviteCode();
	 client.sendMessage(msg.from, `https://chat.whatsapp.com/${inviteLink}

Link group: *${chat.name}*`);
    } else {
      botTol()
            }
	} else {
            botTol2()
        }
	}


  if (msg.type == "ciphertext") {
    // Send a new message as a reply to the current one
	
	
	
    } else if (msg.body == "ping") {
    // Send a new message as a reply to the current one
    msg.reply("pong");
	}
	// UJI COBA!
	
	 else if (msg.body.startsWith(">spam ")) {
		 const delay = require("delay");
let date = new Date();
let millisecond = date.getMilliseconds();
let detik = date.getSeconds();
let menit = date.getMinutes();
let jam = date.getHours();
    //gunakan fitur spam ini sebaik mungkin
    let nomor = msg.body.split(" ")[1];
    let jmlh = msg.body.split(" ")[2];
    let panjang_pesan = Object.keys(msg.body.split(" ")).length;
    let pesan = "";
    for (let i = 3; i < panjang_pesan; i++) {
      pesan += msg.body.split(" ")[i] + " ";
    }
    nomor = nomor.includes("@c.us") ? nomor : `${nomor}@c.us`;
    if (jmlh >= 150) {
      msg.reply("DOSA SOB SPAM BANYAK BANYAK!");
    } else {
      if (jmlh >= 50 && jmlh <= 150) {
        if (pesan == "") {
          for (let i = 1; i < jmlh; i++) {
            client.sendMessage(nomor, "P");
            await delay(1500);
          }
          client.sendMessage(
            nomor,
            `[${jam}:${menit}:${detik}:${millisecond}][BOT] Spam Request by https://wa.me/${
              msg.from.split("@c.us")[0]
            }`
          );
          msg.reply(
            `*[SUKSES]* ${jmlh} Pesan ke ${
              nomor.split("@c.us")[0]
            } (Dengan Memberitahu Bahwa Anda Pengirimnya!)`
          );
          console.log(
            `*[${jam}:${menit}:${detik}:${millisecond}][SUKSES]* Mengirim ${jmlh} Pesan ke ${nomor} (Dari ${msg.from})`
          );
        } else {
          for (let i = 0; i < jmlh; i++) {
            client.sendMessage(nomor, pesan);
            await delay(1500);
          }
          client.sendMessage(
            nomor,
            `[${jam}:${menit}:${detik}:${millisecond}][BOT] Spam Request by https://wa.me/${
              msg.from.split("@c.us")[0]
            }`
          );
          msg.reply(
            `*[SUKSES]* ${jmlh} Pesan ke ${
              nomor.split("@c.us")[0]
            } (Dengan Memberitahu Bahwa Anda Pengirimnya!)`
          );
          console.log(
            `[${jam}:${menit}:${detik}:${millisecond}][SUKSES] Mengirim ${jmlh} Pesan ke ${nomor} (Dari ${msg.from})`
          );
        }
      } else {
        if (pesan == "") {
          for (let i = 1; i < jmlh; i++) {
            client.sendMessage(nomor, "P");
            await delay(1500);
          }
          msg.reply(
            `*[SUKSES]* ${jmlh} Pesan ke ${
              nomor.split("@c.us")[0]
            } (Tanpa Memberitahu Bahwa Anda Pengirimnya!)`
          );
          console.log(
            `[${jam}:${menit}:${detik}:${millisecond}][SUKSES] Mengirim ${jmlh} Pesan ke ${nomor} (Dari ${msg.from})`
          );
        } else {
          for (let i = 0; i < jmlh; i++) {
            client.sendMessage(nomor, pesan);
            await delay(1500);
          }
          msg.reply(
            `*[SUKSES]* ${jmlh} Pesan ke ${
              nomor.split("@c.us")[0]
            } (Tanpa Memberitahu Bahwa Anda Pengirimnya!)`
          );
          console.log(
            `[${jam}:${menit}:${detik}:${millisecond}][SUKSES] Mengirim ${jmlh} Pesan ke ${nomor} (Dari ${msg.from})`
          );
        }
      }
	}
	 }
    
	else if (msg.body.startsWith(">bpck ")) {

const cheerio = require('cheerio');
const request = require('request');
var teks = msg.body.split(">bpck ")[1];
var ubah = teks.replace(" ", "+");
var url = "https://api.terhambar.com/bpk?kata="+ ubah
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
  var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `${b.text}` )
});
	}
	else if (msg.body.startsWith(">film ")) {
const fetch = require('node-fetch');
var cheerio = require('cheerio');
const chalk = require('chalk');
const readlineSync = require('readline-sync');
var judulfilm = msg.body.split(">film ")[1];

const getJudul = (judul) => new Promise((resolve, reject) => {
    fetch(`http://149.56.24.226/?s=${judul.replace(/\s/g, "+")}`, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('div[class="col-xs-9 col-sm-10 search-content"] h2 a').attr('href')
        const titlenya = $('div[class="col-xs-9 col-sm-10 search-content"] h2 a').attr('title')
        const ress2 = $('img[class="img-thumbnail"]').attr('src')
        const hasil = {
            link: ress,
            title: titlenya,
            img: `http:`+ress2
        }
        resolve(hasil)
    })
    .catch(err => reject(err))
});

const getDownloadSource = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('a[class="btn btn-success"]').attr('href')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getRedirect = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = `http://` + link.split('/')[2] + $('frame').attr('src')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getinsideRedirect = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('a[target="_parent"]').attr('href')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getDownloadPage = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {
        var anjing = new Array()
        res.headers.raw()['set-cookie'].forEach(element => {
            anjing.push(element.split(';')[0]+`;`)
        });
        const result = await res.text()
        const ress = 
        {
            link: `https://` + link.split('/')[2] + result.split('$.post("')[1].split('"')[0],
            boday: result.split('}).done(')[0].split('{')[1],
            cookie:`__cfduid=d9fe08c82af51db7b9c63ebddc7ae68861587402310; _ga=GA1.2.658651104.1587402312; _gid=GA1.2.729933755.1587402312; __asc=10283a85171988d0ae80d16e6eb; __auc=10283a85171988d0ae80d16e6eb; _gat=1; ` + anjing.join('')
        }
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getDownloadLink = (link, cookie, referer, boddy) => new Promise((resolve, reject) => {
    const boday = boddy
    fetch(link, {
        method: 'POST',
        headers: {
            "Connection": "keep-alive",
            "Content-Length": boday.length,
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": referer,
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": cookie,          
            },
            body: boday
    })
    .then(async res => {
        const result = await res.text()
        $ = cheerio.load(result)
        const fruits = [];
        const link = [];
        const anjay = [];
        $(`a[target='_blank']`).each(function(i, elem) {
          fruits[i] = (i+1) + '.' + $(this).attr('class').replace('btn-', '').replace('btnx','')+'p'+ ' => ' + $(this).attr('href') 
          link[i] = $(this).attr('href')
        });
        link.forEach(elem =>{
            if(elem.includes('layarkacaxxi.org'))
            {
                anjay.push(elem.split('/')[4])
            }
        })
        const resultnew ={
            link: anjay[0],
            mirror: fruits
        }
        resolve(resultnew)
    })
    .catch(err => reject(err))
});

const startDownloadLast = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'POST',
    })
    .then(async res => {
        const result = await res.json()
        resolve(result)
    })
    .catch(err => reject(err))
});

const shortlink = (link) => new Promise((resolve, reject) => {
    fetch(`https://tinyurl.com/api-create.php?url=${link}`, {
        method: 'GET',
        headers: {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        },
     // body: `url=${link}&type=direct&expiry=&password=&description=&multiple=0`
    })
    .then(async res => {
        const result = await res.text()

        resolve(result)
    })
    .catch(err => reject(err))
});

(async() => {
    try{
        client.sendMessage(msg.from, `- - YANNBOT - -\nLayarkaca 21 Get Direct Link\nWithout Ads!\nCreated by AT.\n- - YANNBOT - -`);
                
                
                const judul        = `${judulfilm}`
                const startGetJudul = await getJudul(judul)
                client.sendMessage(msg.from, `Sedang mencari...`)
                if(typeof startGetJudul.link == 'undefined')
                {
                    client.sendMessage(msg.from, `Film tidak ditemukan!`)
                }else{
			    client.sendMessage(msg.from, `\nDicek dulu yaaaaa ada yang salah tidak\n\nJudul: ${(startGetJudul.title)}\n`)
					//client.sendMessage(msg.from, `Bener ga judulnya gantenk/cantig?`)
				
					
                    //var umur = msg.body.split("")[1];
      //if (umur < 18){

                        const startGetDownloadSource = await getDownloadSource(startGetJudul.link)
                        console.log('[GET] => LINK DOWNLOAD')
                        if(typeof startGetDownloadSource == 'undefined')
                        {
                            console.log('error startGetDownloadSource ')
                        }else{
                            const startGetRedirect = await getRedirect(startGetDownloadSource)
                            console.log('[BYPASS] => REDIRECT')
                            if(typeof startGetRedirect == 'undefined')
                            {
                                console.log('error startGetRedirect ')
                            }else{
                                const startinsideGetRedirect = await getinsideRedirect(startGetRedirect)
                                console.log('[BYPASS] => REDIRECT 2')
                                if(typeof startinsideGetRedirect == 'undefined')
                                {
                                    console.log('error startinsideGetRedirect ')
                                }else{
                                    const startgetDownloadPage = await getDownloadPage(startinsideGetRedirect)
                                    console.log('[BYPASS] => DOWNLOAD PAGE')
                                    if(typeof startgetDownloadPage.link == 'undefined')
                                    {
                                        console.log('error startgetDownloadPage ')
                                    }else{
                                        const startgetDownloadLink = await getDownloadLink(startgetDownloadPage.link, startgetDownloadPage.cookie, startinsideGetRedirect, startgetDownloadPage.boday)
                                        console.log('[BYPASS] => GETTING DOWNLOAD LINK')
                                        if(typeof startgetDownloadLink.link == 'undefined')
                                        {
                                            console.log('[ERROR] => GETTING DOWNLOAD LINK\n')
                                            console.log('[SUCCESS] => GETTING MIRROR DOWNLOAD LINK\n')
                                            const text = ('MIRROR DOWNLOAD') + '\n'+ (startgetDownloadLink.mirror.join('\n'))
                                            console.log(text)
                                        }else{
                                            const startDownloadLastt = await startDownloadLast(`https://layarkacaxxi.org/api/source/` + startgetDownloadLink.link)
                                            if(startDownloadLastt.success == true)
                                            {
                                                
                                                console.log('[SUCCESS] => GETTING DOWNLOAD LINK\n')
                                                const link = [];
                                                for(let i=0;i<startDownloadLastt.data.length;i++)
                                                {
                                                    link.push(startDownloadLastt.data[i].label+' => '+ await shortlink(startDownloadLastt.data[i].file))
                                                }
                                                const a = {
                                                    direct: link,
                                                    mirror: startgetDownloadLink.mirror
                                                }
                                                const text = (`LINK DIRECT (AUTO DOWNLOAD)`) + `\n` + (a.direct.join('\n')) + `\n\n` + ('MIRROR DOWNLOAD') + '\n'+ (a.mirror.join('\n'))
                                                client.sendMessage(msg.from, text)
                                            }else{
                                                console.log('[ERROR] => GETTING DOWNLOAD LINK\n')
                                                console.log('[SUCCESS] => GETTING MIRROR DOWNLOAD LINK\n')
                                                const text = ('MIRROR DOWNLOAD') + '\n'+ (startgetDownloadLink.mirror.join('\n'))
                                                client.sendMessage(msg.from, text)
                                            }
                                        }
                                    }
                                }
                            }
                        }
	                 //}else{
                     //   console.log('Oke deh gantenk/cantig kita cari lagi')
                    }
                
            }catch(err)
            {
                msg.reply('*Error", Silahkan ulang, jika masih error harap hubungi admin!')
            }
    
    
})()



	}
	else if (msg.body.startsWith(">film_l ")) {
		const fetch = require('node-fetch');
const cheerio = require('cheerio');
const readline = require('readline-sync');
var linkfilm = msg.body.split(">film_l ")[1];


const pageFilm = (link) => new Promise((resolve, reject) => {
  fetch(link, {
    method: 'GET',
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0"
    },
  })
  .then(async res => {
    const result = await res.text()
    $ = cheerio.load(result)
    const link = $('a[class="btn btn-success"]').attr('href')
    const judul = $('span[itemprop="name"]').last().text();
    
    resolve({link,judul});
  })
  .catch(err => reject(err))
});

const pageNunggu = (link) => new Promise((resolve, reject) => {
  fetch(link, {
    method: 'GET',
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0"
    },
  })
  .then(async res => {
    const result = await res.text();
    $ = cheerio.load(result)
    const ress = `http://` + link.split('/')[2] + $('frame').attr('src');
    resolve(ress);
  })
  .catch(err => reject(err))
});


const pageDalamNunggu = (link) => new Promise((resolve, reject) => {
  fetch(link, {
    method: 'GET',
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0"
    },
  })
  .then(async res => {

    const result = await res.text()
    $ = cheerio.load(result)
    const ress = $('a[target="_parent"]').attr('href')
    resolve(ress)
  })
  .catch(err => reject(err))
});




const testCookie = (link) => new Promise((resolve,reject) => {
  fetch(link, {
    method: 'GET',
    header: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0"
    }
  })
  .then(async res => {
    var ehehe = [];
    res.headers.raw()['set-cookie'].forEach(element => {
      ehehe.push(element.split(';')[0]+';')
    });
    const result = await res.text()
    const ress = 
    {
        link: `https://` + link.split('/')[2] + result.split('$.post("')[1].split('"')[0],
        bodi: result.split('}).done(')[0].split('{')[1].split('?')[1].split('"')[0],
        cookie:`${ehehe.join('')} _ga=GA1.2.658651104.1587402312; _gid=GA1.2.729933755.1587402312; __asc=10283a85171988d0ae80d16e6eb; __auc=10283a85171988d0ae80d16e6eb; _gat=1; `
    }

    resolve(ress);
  })
});


const getDownloadLink = (data) => new Promise((resolve,reject) => {
  fetch(data.link, {
    method: 'POST',
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Cookie: data.cookie
    },
    body: data.bodi
  })
  .then(async res => {
    const html = await res.text();
    $ = cheerio.load(html);
    const arr = new Array;
    const linknya = [];
    const zz = [];

    $('a[target="_blank"]').each(function(i,item){
      arr.push(`[${i+1}] ${$(this).attr('class').replace('btnx btn-','')}p => ${$(this).attr('href')}`);
      linknya.push(`${$(this).attr('href')}`);
    });

    linknya.forEach(item => {
      if(item.includes('layarkacaxxi.org')){
        zz.push(item.split('/')[4]);
      }
    });

    const resultnya = {
      arr,
      zz: zz[0]
    }

    resolve(resultnya);
  });
});


const link_direct = (id) => new Promise((resolve,reject) => {
  fetch(`https://layarkacaxxi.org/api/source/${id}`,{method:'POST'})
  .then(async res => {
    resolve(await res.json());
  })
});

const shortlink = (link) => new Promise((resolve, reject) => {
  fetch(`https://tinyurl.com/api-create.php?url=${link}`, {
      method: 'GET',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
      }
  })
  .then(async res => {
      const result = await res.text()
      resolve(result)
  })
  .catch(err => reject(err))
});



(async () => {
  try{
        const link_film = `${linkfilm}`;
        const ke_film = await pageFilm(link_film);
        console.log(`judul => ${ke_film.judul}\n`);
        const redirect = await pageNunggu(ke_film.link);
        const skip_redirect = await pageDalamNunggu(redirect);
        const get_cookie_download = await testCookie(skip_redirect);
        const dapet_download_link = await getDownloadLink(get_cookie_download);
        if(dapet_download_link.length === 0){
          msg.reply('Ada kesalahan sob\n');
        }       
		msg.reply(`Sedang membypass link..`);

        client.sendMessage(msg.from, (`"Berhasil!" => dapet link mirror\n${dapet_download_link.arr.join('\n')}\n`));

        if(dapet_download_link.zz === undefined){
        }

        const direct_url = await link_direct(dapet_download_link.zz);

        if(direct_url.success === false){
        }

        const linknya_woi = [];

        for(let i=0;i <= direct_url.data.length -1;i++){
          linknya_woi.push(`[${i + 1}] ${direct_url.data[i].label} => ${await shortlink(direct_url.data[i].file)}`);
        }

        client.sendMessage(msg.from, (`"Berhasil!" => dapet link direct\n${linknya_woi.join('\n')}\n`));
        
      }catch(err){
        client.sendMessage(msg.from, ('Yah.. Gagal sob, gadapet link direct nya :('));
}
})()
	
	}
else if (msg.body.startsWith(">toidr ")) {

const cheerio = require('cheerio');
const request = require('request');
var curr = msg.body.split(" ")[1];
var ball = msg.body.split (" ")[2];
var url = "https://api.terhambar.com/currency?curr="+ curr + "&bal="+ ball
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
  if(response.statusCode == "404" ){
msg.reply(`Mata uang, tidak ditemukan di database.\n Ketik *#matauang* untuk melihat kode mata uang`);
}else if(error){
	console.log("error");
}else{

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `Balance: ${b.result.balanceCurrency}
Convert: ${b.result.resultConvert}`);
}
});
}

else if (msg.body.startsWith(">quotes")) {

const cheerio = require('cheerio');
const request = require('request');
var url = "https://api.terhambar.com/qts"
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
  var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `${b.quotes}` )
});
}
	
	else if (msg.body.startsWith(">ninja ")) {

const cheerio = require('cheerio');
const request = require('request');
var teks = msg.body.split(">ninja ")[1];
//var ubah = teks.replace(" ", "+");
var url = "https://api.terhambar.com/ninja?nama="+ teks
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `${b.result.ninja}` )
});
}
else if (msg.body.startsWith(">mock ")) {

const cheerio = require('cheerio');
const request = require('request');
var teks = msg.body.split(">mock ")[1];
//var ubah = teks.replace(" ", "+");
var url = "https://ostch.herokuapp.com/api/v1/hilih?kata="+ teks
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `${b.result}` )
      });
}
else if (msg.body.startsWith(">ip ")) {

const cheerio = require('cheerio');
const request = require('request');
var teks = msg.body.split(">ip ")[1];
//var ubah = teks.replace(" ", "+");
var url = "https://ostch.herokuapp.com/api/v1/iplookup?q="+ teks
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
  if(response.statusCode == "422" ){
msg.reply(`Alamat ip tidak valid / tidak ditemukan !`);
}else if(error){
	console.log("error");
}else{

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `Ditemukan!

Negara: ${b.country}
Provinsi: ${b.region}
Kota: ${b.city}
Kode Pos: ${b.zip}
Provider: ${b.as}
Maps: ${b.maps}` )
}
});
}
else if (msg.body.startsWith(">gen.nama ")) {

const cheerio = require('cheerio');
const request = require('request');
var teks = msg.body.split(">gen.nama ")[1];
var url = "https://api.terhambar.com/nama?jenis="+ teks
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `${b.result.nama}` )
});
}


else if (msg.body.startsWith(">detailnama ")) {
 
const cheerio = require('cheerio');
const request = require('request');
var req = msg.body.split("[")[1].split("]")[0];
var nama = req.replace(/ /g," ");
var pesan = msg.body;
var y = pesan.replace(/ /g,"+ ");
var tgl = y.split("]+")[1].split("-")[0];
var bln = y.split("-")[1];
var thn = y.split("-")[2];
var url = "https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama="+ req +"&tanggal="+ tgl +"-"+ bln +"-"+ thn
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
 
//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `-Nama: ${b.data.nama}
-Lahir: ${b.data.lahir}
-Usia: ${b.data.usia}
-Ultah: ${b.data.ultah}
-Zodiak: ${b.data.zodiak}`);

client.sendMessage(msg.from, `*Cek arti namamu dengan perintah 
 >nama ${b.data.nama}`);
});
}


else if (msg.body.startsWith(">coronaw")) {

const cheerio = require('cheerio');
const request = require('request');
var url = "https://api.terhambar.com/negara/World"
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);

//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, `Negara: ${b.negara}
Total kasus: ${b.total}
Kasus baru: ${b.kasus_baru}
Meninggal baru: ${b.meninggal_baru}
Total meninggal: ${b.meninggal}
Total sembuh: ${b.sembuh}
Total Penanganan: ${b.penanganan}
	
*Update terakhir*: ${b.terakhir}

*Stay safe ya semua, jaga diri kalian masing masing~` )
});
}

else if (msg.body.startsWith(">cuaca ")) {

const cheerio = require('cheerio');
const request = require('request');
var kota = msg.body.split(">cuaca ")[1];
var url = "http://api.openweathermap.org/data/2.5/weather?q="+ kota +"&appid=4355651c60d51ccbc987c67ee4498ad1"
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
 if(response.statusCode == "404" ){
msg.reply(`Kota tidak ditemukan di database!`);
}else if(error){
	console.log("error");
}else{


 
//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
msg.reply(`Perkiraan cuaca di kotamu

Kota: ${b.name}
Cuaca: ${b.weather[0].main} - ${b.weather[0].description}
Temperatur: ${b.main.temp}°c
Terasa seperti: ${b.main.feels_like}°c
Tekanan udara: ${b.main.pressure}hPa
Kelembabans: ${b.main.humidity}%
Visibility: ${b.visibility}m
Kecepatan angin: ${b.wind.speed}km`)
}
});
}

else if (msg.body.startsWith(">news")) {
 
const cheerio = require('cheerio');
const request = require('request');
var url = "http://newsapi.org/v2/top-headlines?country=id&apiKey=3db49ef82ef448cb91e4dc91991a74ee"
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
 
//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from, 
`*1*. ${b.articles[0].title}

_${b.articles[0].description}_
Selengkapnya: ${b.articles[0].url}

Sumber: ${b.articles[0].source.name}

*2*. ${b.articles[1].title}

_${b.articles[1].description}_
Selengkapnya: ${b.articles[1].url}

Sumber: ${b.articles[1].source.name}

*3*. ${b.articles[2].title}

_${b.articles[2].description}_
Selengkapnya: ${b.articles[2].url}

Sumber: ${b.articles[2].source.name}

*4*. ${b.articles[3].title}

_${b.articles[3].description}_
Selengkapnya: ${b.articles[3].url}

Sumber: ${b.articles[3].source.name}

*5*. ${b.articles[4].title}

_${b.articles[4].description}_
Selengkapnya: ${b.articles[4].url}

Sumber: ${b.articles[4].source.name}`);
});
            } else if (msg.body.startsWith(">jadwal ")) {

const cheerio = require('cheerio');
const request = require('request');
const date = new Date();
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
var hal = msg.body.split(">jadwal ")[1];
var wkt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[0];
console.log(wkt)
var url = "https://api.banghasan.com/sholat/format/json/kota/nama/"+ hal;
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url:     url,
},function(error, response, body){
    let $ = cheerio.load(body);
//var bodi = body.replace("}1", "}");
var d = JSON.parse(body);
var id = d.kota[0].id;
var kota = d.kota[0].nama;
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url:     "https://api.banghasan.com/sholat/format/json/jadwal/kota/"+ id +"/tanggal/"+ wkt,
},function(error, response, body){
    let $ = cheerio.load(body);
var d = JSON.parse(body);
console.log(d)

client.sendMessage(msg.from,
`🌙 Jadwal Sholat 🌙
                      
${d.jadwal.data.tanggal}
*${kota}*
         
🕓 Imsak : ${d.jadwal.data.imsak}
🕓 Subuh : ${d.jadwal.data.subuh}
🕕 Terbit: ${d.jadwal.data.terbit}
🕛 Dzuhur : ${d.jadwal.data.dzuhur}
🕒 Ashar : ${d.jadwal.data.ashar}
🕕 Maghrib : ${d.jadwal.data.maghrib}
🕖 Isya : ${d.jadwal.data.isya}`);
})
	})
	}

else if (msg.body.startsWith(">cerpen")) {
	const cheerio = require('cheerio');
const request = require('request');
const http = require("http");
const htmlToText = require('html-to-text');
 
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
var hal = Math.floor(Math.random() * 30);
var url = "http://cerpenmu.com/category/cerpen-cinta-islami/page/"+ hal
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url:     url,
},function(error, response, body){
    let $ = cheerio.load(body);
//var bodi = body.replace("}1", "}");
//var d = JSON.parse(bodi);
let cerpen = [];
 
    $('article[class="post"] &gt; h2 &gt; a').each(function (i, e) {
        hobbies[i] = $(this).attr("href");
    });
var nomorlink = Math.floor(Math.random() * 10);
var url = cerpen[nomorlink];
request.get({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
 url: url
},function(error, response, body){
    let $ = cheerio.load(body);
//var h  = $.html().replace(/&lt;[^&gt;]*&gt;?/gm, '');
const text = htmlToText.fromString($.html(), {
noLinkBrackets: true,
ignoreHref: true,
ignoreImage:true
});
//console.log(text)  
console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
});
});

}

else if (msg.body.startsWith(">databaca")) {
 
const cheerio = require('cheerio');
const request = require('request');
var url = "https://al-quran-8d642.firebaseio.com/data.json?print=pretty"
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url: url,
},function(error, response, body){
    let $ = cheerio.load(body);
 var b = JSON.parse(body);
 const media = MessageMedia.fromFilePath('./tts/110-annas.mp3');
//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
client.sendMessage(msg.from,
			`Surah: ${b[0].nama} ${b[0].asma}
Arti: ${b[0].arti}
Ayat: ${b[0].ayat}
Diturunkan di kota: ${b[0].type}
Ketik *#baca ${b[0].nomor}* untuk melihat surahnya.`);

client.sendMessage(msg.from, 
			`Surah: ${b[113].nama} ${b[113].asma}
Arti: ${b[113].arti}
Ayat: ${b[113].ayat}
Diturunkan di kota: ${b[113].type}
Ketik *#baca ${b[113].nomor}* untuk melihat surahnya.`);

client.sendMessage(msg.from, 
			`Surah: ${b[112].nama} ${b[112].asma}
Arti: ${b[112].arti}
Ayat: ${b[112].ayat}
Diturunkan di kota: ${b[112].type}
Ketik *#baca ${b[112].nomor}* untuk melihat surahnya.`);

client.sendMessage(msg.from, 
			`Surah: ${b[111].nama} ${b[111].asma}
Arti: ${b[111].arti}
Ayat: ${b[111].ayat}
Diturunkan di kota: ${b[111].type}
Ketik *#baca ${b[111].nomor}* untuk melihat surahnya.`);

client.sendMessage(msg.from, 
			`Surah: ${b[110].nama} ${b[110].asma}
Arti: ${b[110].arti}
Ayat: ${b[110].ayat}
Diturunkan di kota: ${b[110].type}
Ketik *#baca ${b[110].nomor}* untuk melihat surahnya.`);
	
});	  
}
	
else if (msg.body.startsWith(">quoteimg ")) {
		  const cheerio = require('cheerio');
const request = require('request');
const chat = await msg.getChat();
const imageToBase64 = require('image-to-base64');
const { MessageMedia } = require('whatsapp-web.js');

var req = msg.body;
var gh = req.split(">quoteimg ")[1];

var teks = msg.body.split("[")[1].split("]")[0];
var author = gh.split("]")[1];
if(teks.length > 5){ // check longness of text, because otherways google translate will give me a empty file
msg.reply("[WARN] Jika terlalu panjang, kemungkinan teks akan terpotong.")};

const url = "https://terhambar.com/aw/qts/proses.php?kata="+ teks +"&author="+ author +"&tipe=random&font=./font/font1.otf&size=40";
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
request.get({
  headers: {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'},
  url:     url,
},function(error, response, body){
    let $ = cheerio.load(body);
  // var b = JSON.parse(body);
imageToBase64(url) // Path to the image
    .then(
        (response) => {
            console.log("QUOTES BERHASIL DIBUAT!"); // "cGF0aC90by9maWxlLmpwZw=="

var media = new MessageMedia('image/jpg', response);
chat.sendMessage(media, { caption: "Berhasil membuat quotes! ❤️ YannBot"});
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )
//console.log(body)  
//console.log(text.split("kamu dapat")[0].split("Kontak Kami")[1]);
//var keys = Object.keys(b);
});

	  }
  else if (msg.body == ">anime") {
	const fs = require("fs");
const { exec } = require("child_process");

		const chat = await msg.getChat();
    if (msg.hasMedia) {
      const attachmentData = await msg.downloadMedia();
      
fs.writeFileSync("example.jpg", attachmentData.data, {encoding: 'base64'}, function(err) {
    console.log('File created');
});
const fetch = require("node-fetch")
const imageToBase64 = require('image-to-base64');
let response = ''
imageToBase64("example.jpg") // you can also to use url
    .then(
        (response) => {
fetch("https://trace.moe/api/search", {
  method: "POST",
  body: JSON.stringify({ image: response}),
  headers: { "Content-Type": "application/json" }
})
  .then(res => res.json())
  .then(result =>  {
	  if (result.docs.length == 0) {
                		msg.reply( 'Maaf, saya tidak tau ini anime apa')
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = 'Saya memiliki keyakinan rendah dalam hal ini :\n'
                    }
                    teks += [title, title_chinese, title_romaji, title_english]
                    teks += '\n'
                    teks += `Eps : ${episode.toString()}\n`
                    teks += `Kesamaan : ${(similarity * 100).toFixed(1)}%\n`
                   
var video = `https://trace.moe/preview.php?anilist_id=${result.docs[0].anilist_id}&file=${encodeURIComponent(result.docs[0].filename)}&t=${result.docs[0].at}&token=${result.docs[0].tokenthumb}`;
exec('wget "' + video + '" -O wibu.mp4', (error, stdout, stderr) => {
const media = MessageMedia.fromFilePath('wibu.mp4');

	client.sendMessage(msg.from, media, {
	caption: teks });
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
 });
 }
    )
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )

	}
else{
		const tutor = MessageMedia.fromFilePath('./tutor.png');

		client.sendMessage(msg.from, tutor, {
        caption: "Kirim gambar dengan caption *>anime* \n sesuai gambar diatas lalu tunggu sampai \n kita menemukan hasilnya"
      });
	  }
}
else if (msg.body.startsWith(">nh ")) {
const kode = msg.body.split(" ")[1];
const NanaAPI = require("nana-api");
const nana = new NanaAPI();
const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const imageToBase64 = require('image-to-base64');
const { MessageMedia } = require('whatsapp-web.js');

// Get gallery from book ID or book link
nana.g(kode).then((g) => {
if (g == 'Book not found!'){
msg.reply("Kode nuklir nya salah , coba perhatiin lagi")
}else{
var url = "https://t.nhentai.net/galleries/"+ g.media_id +"/nh.jpg"

exec('wget "' + url + '" -O nh.jpg', (error, stdout, stderr) => {
 var teks = "Judul English  : "+ g.title.english.slice("0") +" \n \n Judul Japanese : "+ g.title.japanese +"\n \n Judul Pendek   : "+ g.title.pretty +"\n \n Kode Nuklir    : "+ g.id +" \n ";

const media = MessageMedia.fromFilePath('nh.jpg');
	client.sendMessage(msg.from, media, {
	caption: teks });
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
}
})

}
else if (msg.body.startsWith(">doujinshi ")) {
const kode = msg.body.split(" ")[1];
const NanaAPI = require("nana-api");
const nana = new NanaAPI();
const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");

// Get gallery from book ID or book link
nana.g(kode).then((g) => {
if (g == 'Book not found!'){
msg.reply("Kode nuklir nya salah , coba perhatiin lagi")
}else{

var url = "https://t.nhentai.net/galleries/"+ g.media_id +"/cover.jpg"
var dl = "https://hdl.rurafs.me/download/nhentai/"+ g.id;

 var teks = "Judul English  : "+ g.title.english.slice("0") +" \n \n Judul Japanese : "+ g.title.japanese +"\n \n Judul Pendek   : "+ g.title.pretty +"\n \n Kode Nuklir    : "+ g.id +" \n \n Download Link : "+ dl+"";
exec('nhentai --id=' + g.id + ' -P mantap.pdf -o ./ --format=hentong/'+ g.id, (error, stdout, stderr) => {

let media = new MessageMedia('application/pdf','hentong/'+ g.id +'/mantap.pdf');
	client.sendMessage(media);
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
}
})

	 
	 
  }   
  // TRANSLATE
else if (msg.body.startsWith(">tr ")) {
const translatte = require('translatte');
var codelang = msg.body.split("[")[1].split("]")[0];
var text = msg.body.split("]")[1];
translatte(text, {to: codelang}).then(res => {
    msg.reply(res.text);
}).catch(err => {
    msg.reply(err);
});
}
// LIRIK LAGU
else if (msg.body.startsWith(">lirik ")) {
	var get = msg.body.split(">lirik ")[1];
	var artis = get.split("-")[0];

	var lirik = get.split("-")[1];
	const { getLyrics } = require("genius-lyrics-api");
const options = {
	apiKey: 'NvLyzudSQ3xvZNwGaMzleGIFEDSe6qeQHl6gShNALO3LUI40mmS-nDT611UED5E7',
	title: lirik,
	artist: artis,
	optimizeQuery: true
};
getLyrics(options).then((lyrics) => msg.reply(`${lyrics}`));
}
	
	// FACEBOOK DOWNLOADER
else if (msg.body.startsWith(">fbdl ")) {
    msg.reply(`Permintaan sedang diproses...`);
    let link = msg.body.split(" ")[1];
	var namafile = "fbdl"
	
	const exec = require('child_process').exec;
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
      ],
    });
    const page = await browser.newPage();
    await page
      .goto("https://id.savefrom.net/9-how-to-download-facebook-video.html", {
        waitUntil: "networkidle2",
      })
      .then(async () => {
        await page.type("#sf_url", `${link}`);
        await page.click("#sf_submit");
        try {
          msg.reply("Video Sedang Di Download...");
          await page.waitForSelector(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const element = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const text = await (await element.getProperty("href")).jsonValue();
          const judul = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.meta > div"
          );
          const judul1 = await (await judul.getProperty("title")).jsonValue();
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > Berhasil Dilakukan`
          );
          msg.reply(
`*Download Berhasil!!*
Caption: ${judul1}

🎥 Video sedang dikirim...
Jika durasi besar, maka video akan
membutuhkan waktu sedang
harap bersabar!!`);
		  
exec('wget "' + text + '" -O mp4/'+ namafile +'.mp4', (error, stdout, stderr) => {
  const media = MessageMedia.fromFilePath('mp4/'+ namafile +'.mp4');

	chat.sendMessage(media);
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
          browser.close();
        } catch (error) {
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > GAGAL Dilakukan`
          );
          msg.reply(
            `*[GAGAL]* Pastikan video bersifat publik!!`
          );
          browser.close();
        }
      })
      .catch((err) => {
        console.log(
          `[${moment().format("hh:mm:ss")}][!fb][${msg.from}] > GAGAL Dilakukan`
        );
        msg.reply(
          `*[GAGAL]* Server down, silahkan coba lagi nanti!!`
        );
		
        browser.close();
      });
	 
	 
  } 
  // INSTAGRAM FOTO DOWNLOADER
else if (msg.body.startsWith(">igpdl ")) {
    msg.reply(`Permintaan sedang diproses...`);
    let link = msg.body.split(" ")[1];
	var namafile = "gue.jpg";
	
	const { exec } = require("child_process");
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
      ],
    });
    const page = await browser.newPage();
    await page
      .goto("https://id.savefrom.net/download-from-instagram", {
        waitUntil: "networkidle2",
      })
      .then(async () => {
        await page.type("#sf_url", `${link}`);
        await page.click("#sf_submit");
        try {
          msg.reply("Foto Sedang Di Download...");
          await page.waitForSelector(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const element = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const text = await (await element.getProperty("href")).jsonValue();
          const judul = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.meta > div"
          );
          const judul1 = await (await judul.getProperty("title")).jsonValue();
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > Berhasil Dilakukan`
          );
  msg.reply(
`*Download Berhasil!!*
Caption: ${judul1}

📷 Foto sedang dikirim
harap bersabar!!`);

exec('wget "' + text + '" -O mp4/'+ namafile +'.jpg', (error, stdout, stderr) => {
  const media = MessageMedia.fromFilePath('mp4/'+ namafile +'.jpg');

	chat.sendMessage(media);
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
          browser.close();
        } catch (error) {
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > GAGAL Dilakukan`
          );
          msg.reply(
            `*[GAGAL]* Pastikan foto bersifat publik!!`
          );
          browser.close();
        }
      })
      .catch((err) => {
        console.log(
          `[${moment().format("hh:mm:ss")}][!fb][${msg.from}] > GAGAL Dilakukan`
        );
        msg.reply(
          `*[GAGAL]* Server down, silahkan coba lagi nanti!!`
        );
        browser.close();
      });
}
// INSTAGRAM VIDEO DOWNLOADER
else if (msg.body.startsWith(">igvdl ")) {
    msg.reply(`Permintaan sedang diproses...`);
    let link = msg.body.split(" ")[1];
	var namafile = "gue.mp4";
	
	const { exec } = require("child_process");
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
      ],
    });
    const page = await browser.newPage();
    await page
      .goto("https://id.savefrom.net/download-from-instagram", {
        waitUntil: "networkidle2",
      })
      .then(async () => {
        await page.type("#sf_url", `${link}`);
        await page.click("#sf_submit");
        try {
          msg.reply("Video Sedang Di Download...");
          await page.waitForSelector(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const element = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
          );
          const text = await (await element.getProperty("href")).jsonValue();
          const judul = await page.$(
            "#sf_result > div > div.result-box.video > div.info-box > div.meta > div"
          );
          const judul1 = await (await judul.getProperty("title")).jsonValue();
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > Berhasil Dilakukan`
          );
  msg.reply(
`*Download Berhasil!!*
Caption: ${judul1}

📷 Video sedang dikirim
harap bersabar!!`);

exec('wget "' + text + '" -O mp4/'+ namafile +'.mp4', (error, stdout, stderr) => {
  const media = MessageMedia.fromFilePath('mp4/'+ namafile +'.mp4');

	chat.sendMessage(media);
	if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});
          browser.close();
        } catch (error) {
          console.log(
            `[${moment().format("hh:mm:ss")}][!fb][${
              msg.from
            }] > GAGAL Dilakukan`
          );
          msg.reply(
            `*[GAGAL]* Pastikan foto bersifat publik!!`
          );
          browser.close();
        }
      })
      .catch((err) => {
        console.log(
          `[${moment().format("hh:mm:ss")}][!fb][${msg.from}] > GAGAL Dilakukan`
        );
        msg.reply(
          `*[GAGAL]* Server down, silahkan coba lagi nanti!!`
        );
        browser.close();
      });
	  
	 
  }

else if (msg.body.startsWith(">sial ")) {
const request = require('request');
var req = msg.body;
var tanggal = req.split(" ")[1];
var kk = req.split(" ")[2];
var bulan = kk.replace("0", "");
var tahun = req.split(" ")[3];
const emojiRegex = require('emoji-regex');

const emoye =kk + bulan + tahun ;
 
const regex = emojiRegex();
let match;
if(match = regex.exec(emoye)) {
  const emoji = match[0];
  msg.reply(emoji);
}else{
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://www.primbon.com/primbon_hari_naas.php',
  body: "tgl="+ tanggal +"&bln="+ bulan +"&thn="+ tahun +"&submit=+Submit%21+"
},function(error, response, body){
    let $ = cheerio.load(body);
var y = $.html().split('<b>PRIMBON HARI NAAS</b><br><br>')[1];
    var t = y.split('.</i><br><br>')[1];
    var f = y.replace(t ," ");
    var x = f.replace(/<br\s*[\/]?>/gi, "\n\n");
    var h  = x.replace(/<[^>]*>?/gm, '');
    var d = h.replace("&amp;", '&')
console.log(""+ d);
msg.reply(`Cek Hari Naas Kamu ~

${d}`); 
});
}
}

else if (msg.body.startsWith(">pasangan ")) {
const request = require('request');
const cheerio = require('cheerio');
var req = msg.body;
var gh = req.split(">pasangan ")[1];

var namamu = gh.split("&")[0];
var pasangan = gh.split("&")[1];
request.get({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',
 
},function(error, response, body){
    let $ = cheerio.load(body);
var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
    var t = y.split('.<br><br>')[1];
    var f = y.replace(t ," ");
    var x = f.replace(/<br\s*[\/]?>/gi, "\n");
    var h  = x.replace(/<[^>]*>?/gm, '');
    var d = h.replace("&amp;", '&')
console.log(""+ d);
msg.reply(`${d}`); 
});
}
else if (msg.body == ">18+" || msg.body == "18+") {
msg.reply(" ''Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandangannya dan memelihara kemaluannya; yang demikian itu adalah lebih suci bagi mereka. Sesungguhnya Allah Maha Mengetahui apa yang mereka perbuat. Katakanlah kepada wanita yang beriman: Hendaklah mereka menahan pandangannya, dan kemaluannya, dan janganlah mereka menampakkan perhiasannya, kecuali yang (biasa) nampak daripadanya. (QS. An Nuur: 30-31)'' ");
}

// YOUTUBE TO MP3
else if (msg.body.startsWith(">ytmp3 ")) {
var url = msg.body.split(" ")[1];
var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

const { exec } = require("child_process");
if(videoid != null) {
   console.log("video id = ",videoid[1]);
   console.log(`ID video: *${videoid[1]}* `);
} else {
    msg.reply("Video tidak ada di *youtube* silahkan cek link terlebih dahulu.");
}
msg.reply("Tunggu sebentar kak .. Lagi di proses ☺");
var YoutubeMp3Downloader = require("youtube-mp3-downloader");

//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "ffmpeg", 
    "outputPath": "./mp3",    // Where should the downloaded and en>
    "youtubeVideoQuality": "highest",       // What video quality sho>
    "queueParallelism": 100,                  // How many parallel down>
    "progressTimeout": 2000                 // How long should be the>
});

//Download video and save as MP3 file
YD.download(videoid[1]);

YD.on("finished", function(err, data) {


const musik = MessageMedia.fromFilePath(data.file);
msg.reply(`Mp3 *Berhasil* di download  

Nama File : *${data.videoTitle}*
Nama : *${data.title}*
Artis : *${data.artist}*`);
chat.sendMessage(musik);
});
YD.on("error", function(error) {
    console.log(error);
});

YD.on("progress", function(progress) {
    console.log(JSON.stringify(progress));
});
}
else if (msg.body.startsWith(">cekresi ")) {
const fetch = require('node-fetch')
var nomor = msg.body.split("-n ")[1].split("-k")[0];

var kurir = msg.body.split("-k ")[1];
if (nomor.length == 1){
msg.reply(`nomor resi belum diisi`);

}if (kurir.length == 1){
msg.reply(`kurir belum diisi`)
}else{
const cekResi = (courier, waybill) => new Promise(async (resolve, reject) => {
  const opts = {
    method: 'POST',
    headers: {
      key: 'e079daba710176abe3c4e8edf375cb8e',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams([['waybill', waybill], ['courier', courier]])

  }

  fetch('https://pro.rajaongkir.com/api/waybill', opts)
    .then(res => res.json())
    .then(result => {
console.log(result.rajaongkir)
      msg.reply(`
Code kurir : ${result.rajaongkir.result.summary.courier_code}
Kurir : ${result.rajaongkir.result.summary.courier_name} 
Nomor Resi : ${result.rajaongkir.result.summary.waybill_number}
Kode Service : ${result.rajaongkir.result.summary.courier_name}
Pengirim : ${result.rajaongkir.result.summary.shipper_name}
Penerima : ${result.rajaongkir.result.summary.receiver_name}
Status  :${result.rajaongkir.result.summary.status}

Asal dan Tujuan : ${result.rajaongkir.result.summary.origin} ke ${result.rajaongkir.result.summary.destination}`);
      resolve(result.rajaongkir)
    })
    .catch(err => reject(err))
msg.reply(`[WARN] Pengecekan dimulai!. apabila tidak ada balasan
Kemungkinan no resi / kurir mu salah.`)
})
cekResi(kurir, nomor);
}

// BRAINLY
}
else if (msg.body.startsWith(">brain ")) {
var hh = msg.body.split(">brain ")[1]
var tanya = hh.replace(/ /g, "%20");
const fetch = require('node-fetch')

const url = "https://amiruldev.com/brainly/?q="+ tanya
var regex = /<br\s*[\/]?>/gi;
const solution = () => {
  fetch(url).then(res => res.json()).then((res) => {
    
res.data.questionSearch.edges.slice(-2).forEach(item => {
	var tanyaan = item.node.content
    item.node.answers.nodes.slice(-2).forEach(item => { 
 var jawaban = item['content']
 var g = jawaban.replace(regex, "\n")
 var h  = g.replace(/<[^>]*>?/gm, '');
  msg.reply(
`Pertanyaan: ${tanyaan.replace(regex, "\n")}
  
${h}`);
      })
      console.log("[BRAINLY] Sukses")
    })
  })
}

solution();

	 
	 
  }

else if (msg.body.startsWith(">tts")) {
	var texttomp3 = require("text-to-mp3");
    var fs = require("fs");
	
var suara = msg.body.split(">tts ")[1];
var text = suara.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
var fn = "tts/gue.mp3";
const emojiRegex = require('emoji-regex');

const emoye =text;
 
const regex = emojiRegex();
let match;
if(match = regex.exec(emoye)) {
  const emoji = match[0];
  msg.reply(emoji);
}else{
	console.log("TEXT TO MP3");
if(process.argv.indexOf("-?")!== -1){
  console.log("TextToMp3 bach use the TextToMp3 library wich use the google translate public API to generate an mp3 with ");
  console.log("-t \t\t\t Provide the Text here with \" arround the text \", limited to 200 characters");
  console.log("-f \t\t\t Provide the file name of MP3 you whant generate, otherways it will be generated automatically");
  console.log("");
  return;
}


if(process.argv.indexOf("-t")!== -1)
  text=suara;

if(process.argv.indexOf("-f")!== -1)
  fn=suara;

text = text.replace(/ +(?= )/g,'');//remove all multiple space

if(typeof text ===  "undefined" || text === ""
  || typeof fn === "undefined" || fn === "") { // just if I have a text I'm gona parse
  console.log("missing required params, check out the help with -?");
}


//HERE WE GO
texttomp3.getMp3(text, function(err, data){
  if(err){
    console.log(err);
    return;
  }

  if(fn.substring(fn.length-4, fn.length) !== ".mp3"){ // if name is not well formatted, I add the mp3 extention
    fn+=".mp3";
  }
  var file = fs.createWriteStream(fn); // write it down the file
  file.write(data);
 
  console.log("TTS Berhasil!");
  
});
await new Promise(resolve => setTimeout(resolve, 500));
if(text.length > 200){ // check longness of text, because otherways google translate will give me a empty file
 msg.reply("Terlalu panjang .. disini gabisa lebih dari 200 karakter teks")
}else{
	const media = MessageMedia.fromFilePath(fn);

	chat.sendMessage(media);
}
}
} else if (msg.body == ">mention") {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    chat.sendMessage(`Hi @${contact.number}!`, {
      mentions: [contact]
    });
  } else if (msg.body == ">delete" && msg.hasQuotedMsg) {
    const quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.fromMe) {
      quotedMsg.delete(true);
    } else {
      msg.reply("I can only delete my own messages");
    }


  } else if (msg.body.startsWith(">echo ")) {
    // Replies with the same message
    msg.reply(msg.body.slice(6));
}

else if (msg.body.startsWith(">nama ")) {
const cheerio = require('cheerio');
const request = require('request');
var nama = msg.body.split(">nama ")[1];
var ruk = nama.replace(/ /g,"+");
var req = ruk.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,"janganemoji");
const emojiRegex = require('emoji-regex');

const text =req;
 
const regex = emojiRegex();
let match;
if(match = regex.exec(req)) {
  const emoji = match[0];
  msg.reply(`Jangan pake ${emoji}`);
}else{
request.get({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
},function(error, response, body){
    let $ = cheerio.load(body);
    var y = $.html().split('arti:')[1];
    var t = y.split('method="get">')[1];
    var f = y.replace(t ," ");
    var x = f.replace(/<br\s*[\/]?>/gi, "\n");
    var h  = x.replace(/<[^>]*>?/gm, '');
//console.log(""+ h);
msg.reply(
            `*Arti Dari Namamu*
			---------------------
Nama *_${nama}_* 
Memiliki arti: ${h}`);
});
}
}
else if (msg.body.startsWith(">sifat ")) {
const cheerio = require('cheerio');
const request = require('request');
var req = msg.body.split("[")[1].split("]")[0];
var nama = req.replace(/ /g," ");
var pesan = msg.body;
var y = pesan.replace(/ /g,"+ ");
var tanggal = y.split("]+")[1].split("-")[0];
var bulan = y.split("-")[1];
var tahun = y.split("-")[2];
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://www.primbon.com/sifat_karakter_tanggal_lahir.php',
  body:    "nama="+ req +"&tanggal="+ tanggal +"&bulan="+ bulan +"&tahun="+ tahun +"&submit=+Submit%21+"
},function(error, response, body){
 let $ = cheerio.load(body);
    $('title').after('body')
    var y = $.html().split('<b>Nama :</b>')[1];
    var t = y.split('</i><br><br>')[1];
    var f = y.replace(t ," ");
    var x = f.replace(/<br\s*[\/]?>/gi, "\n");
    var h  = x.replace(/<[^>]*>?/gm, '');
console.log(""+ h);
            msg.reply(
            `Nama: ${h}`);
});
// NOTIFIKASI READY
} else if (msg.body === ">mati" || msg.body === "mati") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply("Maaf, perintah ini tidak bisa digunakan di dalam grup!");
    } else {
      User.checkUser(msg.from).then(result => {
        if (result) {
          User.removeUser(msg.from).then(result => {
            if (result) {
              client.sendMessage(
                msg.from,
                "Berhasil menonaktifkan, anda tidak akan mendapat notifikasi Bot READY lagi."
              );
            } else {
              client.sendMessage(
                msg.from,
                "Gagal menonaktifkan, nomor tidak terdaftar."
              );
            }
          });
        } else {
          client.sendMessage(
            msg.from,
            "Gagal menonaktifkan, nomor tidak terdaftar."
          );
        }
      });
    }
} else if (msg.body === ">aktif" || msg.body === ">daftar" || msg.body === "aktif") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply("Maaf, perintah ini tidak bisa digunakan di dalam grup!");
    } else {
      User.addUser(msg.from).then(result => {
        if (!result) {
          client.sendMessage(msg.from, "Notifikasi Bot READY sudah aktif.");
        } else {
          client.sendMessage(msg.from, "Berhasil mengaktifkan notifikasi Bot READY.");
        }
      });
    }
	// NOTIFIKASI UPDATE
} else if (msg.body === ">mati_up" || msg.body === "mati_up") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply("Maaf, perintah ini tidak bisa digunakan di dalam grup!");
    } else {
      Userup.checkUser(msg.from).then(result => {
        if (result) {
          Userup.removeUser(msg.from).then(result => {
            if (result) {
              client.sendMessage(
                msg.from,
                "Berhasil menonaktifkan, anda tidak akan mendapat notifikasi Bot UPDATE lagi."
              );
            } else {
              client.sendMessage(
                msg.from,
                "Gagal menonaktifkan, nomor tidak terdaftar."
              );
            }
          });
        } else {
          client.sendMessage(
            msg.from,
            "Gagal menonaktifkan, nomor tidak terdaftar."
          );
        }
      });
    }
	} else if (msg.body === ">aktif_up" || msg.body === ">daftar_up" || msg.body === "aktif_up") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply("Maaf, perintah ini tidak bisa digunakan di dalam grup!");
    } else {
      Userup.addUser(msg.from).then(result => {
        if (!result) {
          client.sendMessage(msg.from, "Notifikasi Bot UPDATE sudah aktif.");
        } else {
          client.sendMessage(msg.from, "Berhasil mengaktifkan notifikasi Bot UPDATE.");
        }
      });
    }
} else if (msg.body === ">corona" || msg.body === "corona" || msg.body === "!corona" || msg.body === "#corona") {
   // const fsss = require('fs')
	corona.getAll().then(result => {
      var aktifIndo =
        result[0].confirmed - result[0].recovered - result[0].deaths;
      // var aktifGlob = result[1].confirmed - result[1].recovered - result[1].
      // Kasus *Global*
      // Total Kasus: ${result[1].confirmed}
      // Kasus aktif: ${aktifGlob}
      // Sembuh: ${result[1].recovered}
      // Meninggal: ${result[1].deaths}
      // Update Pada:
      // ${result[1].lastUpdate}
      client.sendMessage(
        msg.from,
        `COVID-19 Update!!*

Kasus *Indonesia* 🇮🇩

😞 Total Kasus: ${result[0].confirmed}
😷 Kasus aktif: ${aktifIndo}
😊 Sembuh: ${result[0].recovered}
😭 Meninggal: ${result[0].deaths}

🕓 Update Pada: 
${result[0].lastUpdate.replace("pukul", "|")} WIB
     

Stay safe ya semuanya , jaga kesehatan nya masing masing`
      );
     // var imageAsBase64 = fsss.readFileSync(
      //  "./CoronaService/corona.png",
      //  "base64"
     // );
     // var CoronaImage = new MessageMedia("image/png", imageAsBase64);
     // client.sendMessage(msg.from, CoronaImage);
   // });

  });

	}
 else if (msg.body.startsWith(">ytmp4 ")) {
const url = msg.body.split(" ")[1];

var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

if(videoid != null) {
   console.log("video id = ",videoid[1]);
   console.log(`ID video: *${videoid[1]}* `);
} else {
    msg.reply("Video tidak ada di *youtube* silahkan cek link terlebih dahulu.");
}
msg.reply(" Tunggu sebentar kak .. Lagi di cek ☺");

const exec = require('child_process').exec;

function os_func() {
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
           exec(cmd, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
       })
   }
}
var os = new os_func();

os.execCommand('ytdl ' + url + ' -q highest -o mp4/'+ videoid[1] +'.mp4').then(res=> {
    const media = MessageMedia.fromFilePath('mp4/'+ videoid[1] +'.mp4');
	msg.reply(`Mp4 *Berhasil* di download. Video sedang dikirim`);
chat.sendMessage(media);
}).catch(err=> {
    console.log("os >>>", err);
})

 }
  else if (msg.body.startsWith(">sendto ")) {
    // Send a new message to the same chat
    msg.reply(` 
	
fitur ini di hapus .. 
silahkan tanya owner kenapa
`);
  }   else if (msg.body == ">donate" ||
    msg.body === "bantu" ||
	msg.body === "donasi" ||
	msg.body === "donate") {
    // Send a new message to the same chat
    client.sendMessage(msg.from, ` 
	Jika merasa bot ini bermanfaat boleh 
	 Bantu memperpanjang server bot nya 
	 dan agar tetap berjalan dan tidak error,
   Dan jika ingin membantu mengembangkan boleh Chat No dibawah
	 
	 jika ingin mendonasi untuk bot selalu aktif & membuat saya semangat untuk update.
	 silahkan klik link dibawah ini :
	 *http://saweria.co/yannbot*
	 
	 Terimakasih yang sudah mendonasi semoga umur panjang, banyak rezeki, dan sehat selalu ❤️
	 
	 *NOTE: Yang mendonate/mendonasi 50k atau lebih (berlaku kelipatan) bisa request 3 fitur baru 🥰❤️
	 
	 😊 Dan jika ingin membantu mengembangkan boleh chat kesini
	 https://api.whatsapp.com/send?phone=6285285593597&text=Saya%20ingin%20membantu
	`);
  }
     else if (msg.body == ">rules" ||
    msg.body === "rules") {
    // Send a new message to the same chat
    client.sendMessage(msg.from, ` 
	*RULES BOT* ... !!!

• *Jangan spam bot ..*
• *Jangan rusuh kalo bot gaaktif*
• *Jangan telfon / vc bot nya ..*	 
• *Jangan req yang aneh aneh ..*
_seperti mendownload video ber jam jam. (max 25min)_
• *Sesuai kan perintah dengan formatnya..*
_salah format dan bot error = block_

Konsekuensi :

 Melanggar rules bot akan keluar 
atau member yang nge rusuh harus di kick 

Rules ini untuk kenyamanan semua yang memakai
bot ini

Regards.
Ryan A.`);
	}else if (msg.body.startsWith(">req ")) {
    // Direct send a new message to specific id
    let number = "6285285593597"
	const teks = msg.body.split(">req ")[1];
	const contact = await msg.getContact();
    number = number.includes("@c.us") ? number : `${number}@c.us`;
    let chat = await msg.getChat();
    chat.sendSeen();
	if(teks.length > 300){ // check longness of text, because otherways google translate will give me a empty file
 msg.reply("Terlalu panjang .. Mohon untuk tidak lebih dari 300 karakter teks")
	}else{
		msg.reply(`Terkirim! :)`);
    client.sendMessage(number, `Hi! Ada permintaan pesan :)
Dari: *${contact.number}*
Isi Pesan: ${teks}`);
  }
	}
  else if (msg.body == "beb" ||
    msg.body === "Beb") {
    // Send a new message to the same chat
    client.sendMessage(msg.from, "Gabut bangettt sihhh.. 🤭");
  }
    else if (msg.body == ":(" ||
    msg.body === "sedih" ||
    msg.body === "😭"  ||
    msg.body === "😢") {
    // Send a new message to the same chat
    msg.reply ("Jangan sedih ya .. aku ada disini kok , coba ceritain apa masalah nya 😊🤗");
  }
  else if (msg.body.startsWith(">loker ")) {
const teks = msg.body.split(" ")[1];
var req = teks.split("[")[1].split("]")[0];
var kerjaan = teks.split("]")[1];
const indeed = require('indeed-scraper');

const queryOptions = {
  host: 'id.indeed.com',
  query: kerjaan,
  city: req,
  radius: '100',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: 100
};

indeed.query(queryOptions).then(res => {
client.sendMessage(msg.from, 
`
==============================
Nama Posisi : 

Pekerjaan   : *${res[0].summary.replace("...", "").replace("...", "")}*

Perusahaan  : *${res[0].company}*

Tempat      : *${res[0].location}*

Waktu       : *${res[0].postDate}*

Link           : *${res[0].url}*

==============================

Nama Posisi :  

Pekerjaan   : *${res[1].summary.replace("...", "")}*

Perusahaan  : *${res[1].company}*

Tempat      : *${res[1].location}*

Waktu       : *${res[1].postDate}*

Link           : *${res[1].url}*

==============================

Nama Posisi :  

Pekerjaan   : *${res[2].summary.replace("...", "")}*

Perusahaan  : *${res[2].company}*

Tempat      : *${res[2].location}*

Waktu       : *${res[2].postDate}*

Link           : *${res[2].url}*

==============================

Nama Posisi :  

Pekerjaan   : *${res[3].summary.replace("...", "")}*

Perusahaan  : *${res[3].company}*

Tempat      : *${res[3].location}*

Waktu       : *${res[3].postDate}*

Link           : *${res[3].url}*

==============================

`);

});
  }  else if (msg.body == ">menu" ||
    msg.body == ">help" || msg.body == "menu") {
		const contact = await msg.getContact();
		const chat = await msg.getChat();
 client.sendMessage(msg.from, `Hi! @${contact.number} 😁,
   
Harap baca & patuhi RULES BOT ⚠️ ..
*>rules*    = Cek *RULES BOT!* (WAJIB BACA)
*>update*  = Cek update bot.
*>donate*  = Donasi bot agar selalu update dan aktif.
*>info*      = Informasi bot.
*>codbah*     = Cek code bahasa.
*>matauang*    = Cek code mata uang asing.
*>masukgrup*    = Cara masukin bot ke grup.

CEK DAFTAR MENU DENGAN PERINTAH

*>1* = Tools unique 💢
*>2* = Fun menu 🤭
*>3* = Downloader 🎬
*>4* = Notifikasi 🔊
*>5* = Data Corona 🧬 & Berita hangat 📰
*>6* = Fitur teks 📝
*>7* = Lokasi 📍
*>8* = Group menu 📌

Yang ingin jasa pembuatan bot bisa chat ke https://s.id/jasabot`, { mentions: [contact]});
	}
   else if (msg.body == ">1"){
client.sendMessage(msg.from, `*Tools/alat*

*>toidr* <matauang> <balance>
=> _Convert mata uang asing ke Indonesia_
contoh: >toidr usd 100
 Untuk code mata uang bisa di cek dengan perintah *_>matauang_*

*>loker* [namakota] pekerjaan
=> _Cari pekerjaan di idneed_
 contoh: >loker [bekasi] admin

*>brain* <soal>
=> _Cari pertanyaan dan jawaban di brainly_
contoh: >brain siapa penemu lampu ?
 
*>req*   <teks>
=> _Request fitur/chat kepada owner bot_
contoh: >req saya mau fitur jadwal shalat
 
*>lirik*  <artis> - <judul>
=> _Cari lirik lagu_
Wajib menggunakan tanda strip (-)

 contoh: >lirik Alan Walker - faded
 
    *Kalo tidak tau nama artis*
	
 contoh >lirik - faded
 
*>databaca*
=> _Data surah pendek Al-Qur'an._

*>quotes*
=> _Random Quotes Bucin_

*>18+* 
=> _Dilarang untuk anak-anak_`);
 }
 else if (msg.body == ">2"){
 client.sendMessage(msg.from, `
   *Menu Hiburan*
 
*>nama* <teks>
 _Cari arti dari namamu_
contoh: >nama Ryan Af

*>gen.nama* <male/female>
 _Generate nama Indonesia_
contoh: >gen.nama male

*>ninja* <teks>
 _Generate nama Ninja_
contoh: >ninja Ryan Af
 
*>nama* <nama>
 _Cari arti dari namamu_
contoh: _>nama Ryan Af

*>detailnama* [nama] tt-mm-yy
 _Cek detail biodata_
contoh: >detailnama [Ryan A] 11-06-1999

*>sifat* [nama] tt-mm-yy
 _Cari sifat berdasarkan nama dan tanggal lahir_
contoh: >sifat [Ryan A] 11-06-1999

*>sial* tt mm yy
 _Cek hari apes mu_
contoh: >sial 17 08 1945

*>pasangan* namamu & pasanganmu
 _Cek kecocokan jodoh_
contoh: >pasangan Kamu & Dia `);

}
else if (msg.body == ">3"){
 client.sendMessage(msg.from, `*Menu Downloader*

*>fb* <url> *(MAINTENANCE)*
=> Downloader facebook
contoh: >fb https://www.facebook.com/xxxx
 
*>igv* <url> *(MAINTENANCE)*
=> download video instagram
contoh: >igv https://www.instagram.com/xxxx
 
*>igp* <url> *(MAINTENANCE)*
=> download foto instagram
contoh: >igp https://www.instagram.com/xxxx

*>ytmp3* <url>
=> Konversi youtube ke mp3
contoh: >ytmp3 https://youtu.be/xxxx

*>ytmp4* <url> 
=> Konversi youtube ke mp4
contoh: >ytmp4 https://youtu.be/xxxx

*>lagu* <judul/lirik>
=> Search lagu
contoh: >lagu lathi

*>film* <judul/url>
=> Download / Bypass link tanpa Ads / Iklan
contoh: >film Train To Busan
or: >film http://149.56.24.226/?s=train%20to%20busan

*>anime*
=> Cek anime apakah itu
contoh: Ketik *>anime* nanti ada step cara nya`);
}
   else if (msg.body == ">4"){
 client.sendMessage(msg.from, `*Menu Notification*

*>aktif*
=> Mengaktifkan notifikasi Bot siap digunakan/Bot aktif!

*>mati*
=> Mematikan notifikasi Bot Siap Digunakan/Bot aktif!

*>aktif_up*
=> Mengaktifkan notifikasi Update!

*>mati_up*
=> Mematikan notifikasi Update!`
);
   }
   else	if (msg.body == ">5"){
 client.sendMessage(msg.from, `*Corona Update*

*>corona*
=> Data corona update di *Indonesia*

*>coronaw*
=> Data corona update di *Dunia* 

*>lokasi*
=> Cek zona corona di dekatmu
contoh: Kirim lokasi, lalu mengreply dengan ketik >lokasi
Info lebih lanjut ketik >lokasi nanti ada panduan nya.`
);
   }
   else	if (msg.body == ">6"){
 client.sendMessage(msg.from, `*Ubah teks*

*>bpck* <teks>
=> Ubah teks menjadi teks bapack - bapack
contoh: >bpck Ngakak abiss

*>mock* <teks>
=> Ubah teks menjadi alay
contoh: >mock Ngakak abiss

*>tts* <teks>
=> Ubah teks ke suara
contoh: >tts saya suka jambu

*>tr* <codebahasa> <teks>
=> Ubah teks menjadi translate
contoh: >tr [en] saya suka jambu`
);
      }
   else	if (msg.body == ">7"){
 client.sendMessage(msg.from, `*Lokasi*

*>getloc*
=> Mengambil atau menjebak untuk dapatkan lokasi

*>ip* <teks/ip>
=> Cek data ip
contoh: >ip 8.8.8.8

*>cuaca* <namakota>
=> Cek cuaca sekarang di kotamu
contoh: >cuaca jakarta`
);
   }
else if (msg.body == ">8"){
 client.sendMessage(msg.from, ` *[OWNER]*
*>leave* 
=> Bot leave / keluar grup

*>revoke* 
=> Ubah / tarik link grup

*>subject* <teks>
=> Change subject Group
contoh: >subject YannBot

*>deskripsi* <teks>
=> Change deskripsi Group
contoh: >deskripsi YannBot

*>add* <nomer>
=> Add member ke Group
contoh: >add 08xxxxxxxxxx
Note: *Only use 08xx
  
*>dm* _@tagmember_
=> Ubah admin menjadi member
contoh: >dm @yann
Note: *Only use @

*>pm* _@tagmember_
=> Ubah member menjadi admin
contoh: >dm @yann
Note: *Only use @
  
*>kick* _@tagmember_
=> Turunkan admin menjadi member
contoh: >kick @yann
=> Kalo ada alasan
contoh: >kick @yann -lucu
Note: *Only use @

  *[ALL USER]*
*>getmember*
=> Say ke semua member grup
=> Kalo ingin merubah teks
contoh: >getmember oi
  
*>ginfo*
=> Group data info

*>linkgrup*
=> Mengambil link grup chat` );
}
else if (msg.body == ">fb " || msg.body == ">igp" || msg.body == ">igv"){
 const contact = await msg.getContact();
 client.sendMessage(msg.from, `*Maintenance*` );
}
else if (msg.body == ">update" || msg.body == "update"){
 const contact = await msg.getContact();
 client.sendMessage(msg.from, `Hi *${contact.pushname}* 😁.
Ini adalah info update terbaru bot ini👍

*11/08/2020*
-[added] >detailnama

*12/08/2020*
-[added] >newstoday
-[added] >shalat [maintenance]
-[added] >databaca

*14/08/2020*
-[added] >lagu
-[added] >yts

*19/08/2020*
-[added] >bot join
-[added] >mock

*20/08/2020*
-[added] >revoke
-[added] >linkgrup
-[added] >req
-[added] >film
-[added] >revoke
-[added] >linkgrup
-[added] >aktif_up
-[added] >mati_up

-[fixed] Fixed notification

*21/08/2020*
-[added] >lokasi
-[added] >ip
-[added] >cuaca

*Jika ingin request menambahkan fitur bisa chat ke :
https://s.id/reqfitur 

*Donate*: https://saweria.co/donate/yannbot
Ayo bersama-sama bantu mengembangkan bot ini!`);

 }
   else if (msg.body == ">info"){
client.sendMessage(msg.from, 
`*INFO*
Server bot akan di restart setiap jam 17.00 - Sampai selesai. (max 5jam)

Maintenance setiap hari sabtu jam 12.00 - Sampai selesai dikarenakan *update* pada hari itu juga.
(hari dan jam tidak menentu)

*SHIFT BOT*

-Pagi: 07.00 - 12.00
-Sore: 15.00 - 17.00
-Malam: 18.30 - 22.00

HARI MINGGU KEMUNGKINAN LIBUR`);
   }
else if (msg.body == ">masukgrup" || msg.body == "masukgrup"){
 const contact = await msg.getContact();
 client.sendMessage(msg.from, `Hi ${contact.pushname}
*Cara Mengundang Bot Ke Grup*

Untuk mengundang Bot Ke Grup Silahkan Chat Owner Secara Pribadi
Ryan : wa.me/6285285593597
Terimakasih!`);
}else if (msg.body == ">matauang") {
    msg.reply(`
Mata Uang                Code
######               #####
btc, usd, eur, gbp, aud, cad, chf, cny, jpy, sgd, nzd, pkr, hkd, krw, mxn, nok, egp, clp, ngn, brl, rub, uah, thb, pln, inr, eth, xmr, dash, doge, ltc, str, xrp`);
 }else if (msg.body == ">codbah") {
    msg.reply(`
	Bahasa                Code
######               #####
English                 |  en
Esperanto            |  eo
Estonian              |  et
Finnish                |  fi
French                 |  fr
Frisian                 |  fy
Galician               |  gl
Georgian              |  ka
German               |  de
Greek                   |  el
Gujarati               |  gu
Haitian Creole    |  ht
Hausa                  |  ha
Hawaiian            |  haw (ISO-639-2)
Hebrew               |  he or iw
Hindi                   |  hi
Hmong                |  hmn (ISO-639-2)
Hungarian          |  hu
Icelandic             |  is
Igbo                     |  ig
Indonesian         |  id
Irish                     |  ga
Italian                  |  it
Japanese             |  ja
Javanese              |  jv
Kannada              |  kn
Kazakh                 |  kk
Khmer                  |  km
Kinyarwanda      |  rw
Korean                 |  ko
Kurdish               |  ku
Kyrgyz                |  ky
Lao                      |  lo
Latin                   |  la
Latvian               |  lv
Lithuanian         |  lt
Luxembourg     |  lb
Macedonian      |  mk
Malagasy           |  mg
Malay                 |  ms
Malayalam        |  ml
Maltese               |  mt
Maori                  |  mi
Marathi               |  mr
Myanmar.          |  my
Nepali                 |  ne
Norwegian          |  no
Nyanja.               |  ny
Odia (Oriya)        |  or
Pashto                |  ps
Persian               |  fa
Polish                 |  pl
Portuguese.        |  pt
Punjabi               |  pa
Romanian           |  ro
Russian               |  ru
Samoan               |  sm
Scots Gaelic        |  gd
Serbian               |  sr
Sesotho               |  st
Shona                 |  sn
Sindhi                 |  sd
Slovak                 |  sk
Slovenian            |  sl
Somali                 |  so
Spanish               |  es
Sundanese          |  su
Swahili                |  sw
Swedish               |  sv
Tagalog.               |  tl
Tajik                     |  tg
Tamil                    |  ta
Tatar                     |  tt
Telugu                  |  te
Thai                      |  th
Turkish                |  tr
Turkmen              |  tk
Ukrainian             |  uk
Urdu                      |  ur
Uyghur                  |  ug
Uzbek                    |  uz
Vietnamese          |  vi
Welsh                   |  cy
Xhosa                   |  xh
Yiddish                 |  yi
Yoruba                  |  yo
Zulu                      |  zu` );
	
	
   } else if (msg.body.startsWith('>bot join ')) {
        const inviteCode = msg.body.slice(10).replace('https://chat.whatsapp.com/', '')
        if (msg.body.slice(10).match(/(https:)/gi)) {
			const check = await client.getInviteInfo(inviteCode)
                    if (check.size < 3) {
                        msg.reply( 'Member group tidak melebihi 30, bot tidak bisa masuk');
                    } else {
            try {
                await client.acceptInvite(inviteCode);
                msg.reply('Permintaan diterima, bot akan segera masuk!.');
            } catch (e) {
                msg.reply('🔐 Sepertinya link group telah dibatalkan sob!.');
                console.log(inviteCode)
            }
					}
        } else {
            msg.reply('😎👊 ini link ?')
        }
		
		
	// GROUP INFO
	} else if (msg.body == ">ginfo") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply(
	  `*Group Details*
Nama Group: ${chat.name}
Deskripsi Group: ${chat.description}
Dibuat pada: ${chat.createdAt.toString()}
Dibuat oleh: ${chat.owner.user}
Total member: ${chat.participants.length}`);
    } else {
      msg.reply("This command can only be used in a group!");
    }
	 } else if (msg.body == '>chats') {
        const chats = await client.getChats();
        client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
    } else if (msg.body == '>botinfo') {
        let infop = client.info.phone;
		let info= client.info
        client.sendMessage(msg.from, `*Connection info*
My name: ${info.pushname}
My number: ${info.me.user}
Platform: ${info.platform}
Device name: ${infop.device_model}
OS build number: ${infop.os_build_number}
OS version: ${infop.os_version}
WhatsApp version: ${infop.wa_version}`);
	} else if (msg.body == ">mediai" && msg.hasMedia) {
    const attachmentData = await msg.downloadMedia();
    // console.log(attachmentData)
    msg.reply(`*Media Info*
MimeType: ${attachmentData.mimetype}
Filename: ${attachmentData.filename}
Data (length): ${attachmentData.data.length}`);
		} else if (msg.body == '>quoteinfo' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();

        quotedMsg.reply(`Type: ${quotedMsg.type}
Author: ${quotedMsg.author || quotedMsg.from}
Timestamp: ${quotedMsg.timestamp}`);
    } else if (msg.body == '>resendmedia' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const attachmentData = await quotedMsg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
        }
	
	// ARCHIVE CHAT
	} else if (msg.body === ">archive") {
    const chat = await msg.getChat();
    chat.archive(); 
	} else if (msg.body === ">unarchive") {
    const chat = await msg.getChat();
    chat.unarchive(); 
    
} else if (msg.body === '>mute') {
        const chat = await msg.getChat();
        // mute the chat for 24 Hours
        const unmuteDate = new Date();
        unmuteDate.setSeconds(unmuteDate.getHours() + 24);
        await chat.mute(unmuteDate);
		msg.reply('Berhasil mute 24 jam');
	} else if (msg.body === ">unmute") {
    const chat = await msg.getChat();
    chat.unmute();
	msg.reply('Berhasil unmute!');
	}
	 else if (msg.body === ">recording") {
    const chat = await msg.getChat();
    chat.sendStateRecording(); 
	}else if (msg.body === ">typing") {
    const chat = await msg.getChat();
    chat.sendStateTyping(); 
	
	
}
else if (msg.body == ">getloc"){
 client.sendMessage(msg.from, `Buka link dibawah terlebih dahulu
 
http://s.id/getlocnow
	
 *TUTORIAL*
 1. Buat link baru
 2. Salin id link
 3. Berikan link kepada target yang ingin dituju
 4. Cek hasil dengan mencatumkan id link
 _(hasil muncul apabila target sudah klik link yang anda kirim)_
 
 *NOTED*
 -Pada point no 3 terserah kalian bagaimanapun caranya, agar target dapat membuka link dan mengijinkan lokasinya.
 -Akurat jika target membuka link menggunakan hp.
 `);
}
  else if (msg.body == '>location') {
        msg.reply(new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
  }
   else if (msg.body.startsWith(">yts ")) {
	   var keyword = msg.body.split(" ")[1];
    let axios = require('axios').default;
function foreach(arr, func){
  for(var i in arr){
    func(i, arr[i]);
  }
}
async function searchYoutube(keyword) {
    let request = await axios.get("https://www.youtube.com/results", {
        params: {
            "search_query": keyword,
            "disable_polymer": 1
        }
    });
    let body = request.data;
    if (body.substring(0,92) == '<!doctype html><html  style="font-size: 10px;font-family: Roboto, Arial, sans-serif;" lang="') {
        let page = String(body);
        let pageSource = page.split(",");
        let id = [];
		let title = [];
        let idIndex = 0;
        for (let index in pageSource) {
            if (pageSource[index].substring(0, 10) == '"videoId":' && pageSource[index].length == 23) {
                idIndex ++;
                if (idIndex % 2) {
                    id.push(pageSource[index].substring(11, pageSource[index].length - 1));
                };
            };
        };
        return id;
    }
    else {
        let page = String(body);
        let pageSource = page.split(" ");
        let id = [];
		let title = [];
        let idIndex = 0;
        for (let index = 0; index<pageSource.length; index+=1) {
            element = pageSource[index];
            if (element.substring(0,15) == 'href="/watch?v='  && element.length == 27) {
                idIndex++;
                if (idIndex % 2) {
                    id.push(element.substring(15, element.length -1));
                };
            };
        };
        return id;
    };
};

let id= "";
let title= "";
(async () => {
var gg = await searchYoutube(keyword);
msg.reply(` Hmm.. Ditemukan :)
Salin ID dibawah, gunakan untuk download video / musik!
ID diambil dari upload terbaru - terlama.
1. ${gg[0]}
2. ${gg[1]}
3. ${gg[2]}
4. ${gg[3]}
5. ${gg[4]}`)

})();

  
    } else if (msg.body.startsWith(">lagu ")) {
let axios = require('axios').default;

async function searchYoutube(keyword) {
    let request = await axios.get("https://www.youtube.com/results", {
        params: {
            "search_query": keyword,
            "disable_polymer": 1
        }
    });
    let body = request.data;
    if (body.substring(0,92) == '<!doctype html><html  style="font-size: 10px;font-family: Roboto, Arial, sans-serif;" lang="') {
        let page = String(body);
        let pageSource = page.split(",");
        let id = [];
        let idIndex = 0;
        for (let index in pageSource) {
            if (pageSource[index].substring(0, 10) == '"videoId":' && pageSource[index].length == 23) {
                idIndex ++;
                if (idIndex % 2) {
                    id.push(pageSource[index].substring(11, pageSource[index].length - 1));
                };
            };
        };
        return id;
    }
    else {
        let page = String(body);
        let pageSource = page.split(" ");
        let id = [];
        let idIndex = 0;
        for (let index = 0; index<pageSource.length; index+=1) {
            element = pageSource[index];
            if (element.substring(0,15) == 'href="/watch?v='  && element.length == 27) {
                idIndex++;
                if (idIndex % 2) {
                    id.push(element.substring(15, element.length -1));
                };
            };
        };
        return id;
    };
};
var hh = msg.body.split(">lagu ")[1];
var keyword = hh.replace(/ /g, "+");
//////////Calling Async Function//////////
(async () => {
	msg.reply("Permintaanmu sedang di proses..");
    index = 0

    result = await searchYoutube(keyword);
    console.log(result[index])
    var YoutubeMp3Downloader = require("youtube-mp3-downloader");
console.log(result[index]);
//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "ffmpeg", 
    "outputPath": "./mp3",    // Where should the downloaded and en>
    "youtubeVideoQuality": "highest",       // What video quality sho>
    "queueParallelism": 100,                  // How many parallel down>
    "progressTimeout": 2000                 // How long should be the>
});

//Download video and save as MP3 file
YD.download(result[index]);

YD.on("finished", function(err, data) {


const musik = MessageMedia.fromFilePath(data.file);
msg.reply(`Hmm.. Ditemukan! :)
Judul: *${data.videoTitle}*

Link: youtube.com/watch?v=${(result[index])}`);
chat.sendMessage(musik);
});
});
	}
    
    
    
     else if (msg.body.startsWith('!video ')) {
         if(loaded==0){

 
         let datetime = new Date();
         let search = msg.body.slice(7);
        
         
        const videodl = await youtube.getVideo(`${search}`);
     
        if(videodl.url.includes("https")){
      
        if(videodl.minutes<=6){
             

        msg.reply(`Title:${videodl.title}\nUrl:${videodl.url} \nSeems to be the Title of the video! \nIf this is what you require,please reply !dw to this message!`);
        }else{
            
        msg.reply('Video too lengthy! Only send videos upto 6 minutes!');}
        }} 
        else{
        msg.reply('Command limit reached! Please try after sometime');}
        }
        
        else if(msg.body =="!dw" && msg.hasQuotedMsg && (loaded ==0)){
            const qmsg = await msg.getQuotedMessage();
            if(qmsg.body.includes("Url:") && qmsg.fromMe){
                let chat = await msg.getChat();
                let datetime = new Date();
                const file = fs.createWriteStream(`/DIRECTORY/video${datetime}.mp4`);
                let str=qmsg.body.substr(qmsg.body.indexOf('https://'));
                const video = youtubedl(`${str}`,
  ['--format=18'],);
  
  video.on('info', function(info) {
               loaded=1;
                       msg.reply(`Acknowledged!
Sending video in 20 seconds!\nYou will recieve a direct message from me!`);
}
);


 video.pipe(file);
   
   setTimeout(function(){
       const musicAsBase64 = fs.readFileSync(`/DIRECTORY/video${datetime}.mp4`, 'base64');
        const media = new MessageMedia('video/mp4', musicAsBase64);
        if(chat.isGroup){
        client.sendMessage(msg.author, media);}
        else{
        client.sendMessage(msg.from,media);
            }
        
        loaded =0;
        }, 20000);
                
                }
            }
        

        
        


    
    
    
    


    setTimeout(()=>{
    counter--;},1000)
recentcmd.add(usr);
    setTimeout(() =>{
    recentcmd.delete(usr);
    fspamm.delete(usr);
    },5000);
    
    setTimeout(() =>{
    sban.delete(usr);
	
    
    },900000);


            
    
    
    
    
               
    }} 
    else{setTimeout(()=>{counter=0;},15000, pesan);}
 //Cooldown condition close
   // else if (msg.body == "Assalamualaikum" || msg.body == "assalamu'alaikum" || msg.body == "assalamualaikum" || msg.body == "mikum") {
    // client.sendMessage(msg.from, `Waalaikumusalam wr.wb`);
});

client.on('message_create', (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        // do stuff here
    }
});

client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});

client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        // The message was read
    }
});

client.on('group_join', async (notification) => {
    // User has joined or been added to the group.
});

client.on('group_leave', async (notification) => {
    // User has left or been kicked from the group.
    
    console.log('leave', notification);
    
});

client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('update', notification);
});

client.on('change_battery', (batteryInfo) => {
    // Battery percentage for attached device has changed
    const { battery, plugged } = batteryInfo;
    console.log(`Battery: ${battery}% - Charging? ${plugged}`);
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.on('change_state', async (reason) => {
    if(reason=="TIMEOUT"){
    console.log("Bye Bye");
    pool.end()
    client.destroy();
    process.exit();
}
    
});


