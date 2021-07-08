const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true,
    appToken: process.env.APP_TOKEN
  });

app.command('/ticket', async ({ ack, body, client }) => {
  await ack();
  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
          "type": "modal",
          "callback_id": "view_1",
          "submit": {
            "type": "plain_text",
            "text": "Continue",
            "emoji": true
          },
          "close": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true
          },
          "title": {
            "type": "plain_text",
            "text": "IT Ticket Form:",
            "emoji": true
          },
          "blocks": [
            {
              "type": "section",
              "block_id": "ticket_1", // BLOCK ID
              "text": {
                "type": "plain_text",
                "text": ":wave: Hi there! Please fill out the following form with additional information related to the reason you're making an inquiry.",
                "emoji": true
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "input",
              "label": {
                "type": "plain_text",
                "text": "What kind of issue are you having?",
                "emoji": true
              },
              "element": {
                "type": "static_select",
                "action_id": "issue_type",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select an applicable issue",
                  "emoji": true
                },
                "options": [
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Desktop/Laptop Hardware (broken screen, bloating battery, etc.)",
                      "emoji": true
                    },
                    "value": "value-0"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Software (Concordance, ATO, Vertical Wave, etc.)",
                      "emoji": true
                    },
                    "value": "value-1"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Network Folders/Drives (S: Drive, P: Drive, U: Drive, etc.)",
                      "emoji": true
                    },
                    "value": "value-2"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "Requesting Replacement Hardware (Old, Out of Warranty, etc.)",
                      "emoji": true
                    },
                    "value": "value-3"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "text": "My Issue Isn't Listed",
                      "emoji": true
                    },
                    "value": "value-4"
                  }
                ]
              }
            },
            {
              "type": "input",
              "label": {
                "type": "plain_text",
                "text": "Can you explain your issue a little more in detail?",
                "emoji": true
              },
              "element": {
                "action_id": "issue_desc",
                "type": "plain_text_input",
                "multiline": true
              }
            },
            {
              "type": "input",
              "label": {
                "type": "plain_text",
                "text": "Anything else you want to tell us?",
                "emoji": true
              },
              "element": {
                "action_id": "issue_further",
                "type": "plain_text_input",
                "multiline": true
              },
              "optional": true
            }
          ]
        },
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();