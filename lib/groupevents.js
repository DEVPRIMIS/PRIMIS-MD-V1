//Give Me Credit If Using This File Give Me Credit On Your Channel ✅ 
// Credits PrimisTech - PRIMIS-MD 💜 

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363417691451409@newsletter',
            newsletterName: 'HACKER PROGRAMING',
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://files.catbox.moe/dvzjmg.jpeg',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `ʜɪ ᴅᴇᴀʀ @${userName} 👋\n` +
                    `ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ🤹‍♀️ *${metadata.subject}*.\n` +
                    `ʏᴏᴜ ᴀʀᴇ ᴛʜᴇ ɴᴜᴍʙᴇʀ ${groupMembersCount} ɪɴ ᴛʜɪs ɢʀᴏᴜᴘ. 🤸‍♀️\n` +
                    `ᴛɪᴍᴇ 📆: *${timestamp}*\n` +
                    `ᴇɴᴊᴏʏ ᴀɴᴅ ʀᴇᴀᴅ ᴛʜᴇ ɢʀᴏᴜᴘ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ ғᴏʀ ᴍᴏʀᴇ ɪɴғᴏ🔖:\n` +
                    `${desc}\n` +
                    `*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙳𝙴𝚅 𝙿𝚁𝙸𝙼𝙸𝚂*.`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `ʜᴜʜᴡ! @${userName}. ʟᴇғᴛ ᴛʜᴇ ɢʀᴏᴜᴘ😶\n` +
                    `ᴛʜᴇ ɢʀᴏᴜᴘ ɴᴏᴡ ʜᴀs ${groupMembersCount} ᴍᴇᴍʙᴇʀs.\n` +
                    `ᴛɪᴍᴇ ʟᴇғᴛ: *${timestamp}*\n` +
                    `ᴘʟᴇᴀsᴇ sʜᴀʀᴇ ᴛʜᴇ ɢʀᴏᴜᴘ ʟɪɴᴋ ғᴏʀ ɴᴇᴡ ᴍᴇᴍʙᴇʀ(s)`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*Admin Event*\n\n` +
                          `@${demoter} has demoted @${userName} from admin. 👀\n` +
                          `Time: ${timestamp}\n` +
                          `*Group:* ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*Admin Event*\n\n` +
                          `@${promoter} has promoted @${userName} to admin. 🎉\n` +
                          `Time: ${timestamp}\n` +
                          `*Group:* ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
  
