# Discord.js Starter Template with CommandKit

A modern Discord.js starter template featuring CommandKit for command handling, database integration, and a clean project structure.

## 🚀 Features

- **CommandKit Integration**: Modern command and event handling system
- **Database Support**: Built-in SQLite and JSON database support using st.db
- **Sequelize ORM**: Advanced database operations with Sequelize
- **YAML Configuration**: Easy configuration management
- **Event System**: Organized event handling structure
- **Validation System**: Built-in user role validation with Components V2
- **TypeScript Support**: Full TypeScript definitions for CommandKit
- **Modular Architecture**: Clean separation of concerns
- **Automatic Database Sync**: Database tables are automatically synchronized on startup

## 📁 Project Structure

```
├── src/
│   ├── Commands/          # Slash commands
│   │   └── Ping.js       # Example ping command with TypeScript annotations
│   ├── Events/           # Discord events
│   │   ├── clientReady/  # Bot ready events
│   │   │   └── ready.js  # Bot ready event handler
│   │   └── messageCreate/ # Message events
│   │       └── hi.js     # Message event handler example
│   ├── Database/         # Database configuration
│   │   ├── Config/       # Database configs
│   │   │   ├── index.js  # Database exports
│   │   │   ├── Example.js # Example database config
│   │   │   ├── Sequelize.js # Sequelize configuration
│   │   │   └── YamlConfig.js # YAML configuration
│   │   ├── Data/         # Database files
│   │   │   └── Example.json # Example database data
│   │   ├── Helpers/      # Database helper functions
│   │   │   └── index.js  # Helper exports
│   │   └── Models/       # Database models
│   │       └── User.js   # User model with Sequelize
│   ├── Validations/      # Command validations
│   │   └── userRoles.js  # User role validation with Components V2
│   └── Utils/           # Utility functions
├── Config.yaml          # Bot configuration
├── index.js            # Application entry point
└── package.json        # Dependencies
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AboMeezO/D.js-Starter-Files
   cd D.js-Starter-Files
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your bot**

   - Open `Config.yaml`
   - Add your Discord bot token:
     ```yaml
     Token: YOUR_BOT_TOKEN_HERE
     ```

4. **Start the bot**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Bot Token Setup

Edit the `Config.yaml` file and add your Discord bot token:

```yaml
Token: your_discord_bot_token_here
```

### Database Configuration

The template includes multiple database systems:

- **YAML Config**: For bot configuration (Config.yaml)
- **Example Database**: Additional database for examples (src/Database/Data/Example.json)

## 📝 Creating Commands

Commands are located in `src/Commands/`. Here's the structure:

```javascript
export default {
  /**
   * @type {import('commandkit').CommandData}
   */
  data: {
    name: "commandname",
    description: "Command description",
  },
  /**
   *
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {
    await interaction.reply("Command response!");
  },
  /**
   * @type {import('commandkit').CommandOptions}
   */
  options: {
    botPermissions: [],
    userPermissions: [],
    deleted: false,
    devOnly: false,
    guildOnly: false,
  },
};
```

### Command Options

- `botPermissions`: Required bot permissions
- `userPermissions`: Required user permissions
- `deleted`: Whether the command is deleted
- `devOnly`: Restrict to developers only
- `guildOnly`: Restrict to guilds only

## 🎯 Creating Events

Events are located in `src/Events/`. Create folders for event types and add your event files:

### Client Ready Event

```javascript
export default (client) => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
};
```

### Message Create Event

```javascript
/**
 * @param {import('discord.js').Message} message
 * @param {import('discord.js').Client} client
 */
export default async (message, client) => {
  if (message.content !== "hi" || message.author.bot) return;
  await message.reply("hey");
};
```

## 🔐 Validations

The template includes a user role validation system in `src/Validations/userRoles.js` using Discord.js Components V2. Add it to your command options:

```javascript
options: {
  userRoles: ["role_id_1", "role_id_2"], // Required role IDs
}
```

### Validation Structure

The validation system uses Components V2 for enhanced user experience:

```javascript
import {
  ContainerBuilder,
  MessageFlags,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
} from "discord.js";

/**
 * @param {import('commandkit').ValidationFunctionProps} param0
 */
export default function ({ interaction, commandObj }) {
  const requiredRoles = new Set(commandObj.options?.userRoles);
  if (!requiredRoles.size) return false;

  const hasRequiredRole = interaction.member.roles.cache.some((role) =>
    requiredRoles.has(role.id)
  );

  if (!hasRequiredRole) {
    interaction.reply({
      flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
      components: [
        new ContainerBuilder()
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
              `## ⛔ **Insufficient Permissions**`
            )
          )
          .addSeparatorComponents(
            new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
              `You need the following roles:\n\n${[...requiredRoles]
                .map((role) => `• <@&${role}>`)
                .join("\n")}`
            )
          ),
      ],
    });
    return true;
  }
  return false;
}
```

## 🗄️ Database Usage

The template includes multiple database systems for different use cases:

### YAML Configuration

```javascript
import { YamlConfig } from "./Database/index.js";

// Get configuration
const token = await YamlConfig.get("Token");

// Set configuration
await YamlConfig.set("Key", "Value");
```

### JSON Database (st.db)

```javascript
import { Example } from "./Database/index.js";

// Example Database
await Example.set("exampleKey", "exampleValue");
const exampleData = await Example.get("exampleKey");
```

### Sequelize ORM with SQLite

The template includes Sequelize for advanced database operations:

```javascript
import { sequelize, Users } from "./Database/index.js";

// Database initialization (handled automatically in app.js)
await sequelize.sync();

// Create a new user
const newUser = await Users.create({
  id: "123456789",
  username: "example_user",
  level: "1",
});

// Find a user
const user = await Users.findOne({
  where: { id: "123456789" },
});

// Update a user
await Users.update({ level: "2" }, { where: { id: "123456789" } });

// Delete a user
await Users.destroy({
  where: { id: "123456789" },
});
```

### User Model Structure

The included User model provides a foundation for user management:

```javascript
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/index.js";

const Users = sequelize.define("users", {
  id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: "0",
    allowNull: false,
  },
});
```

## 🏗️ Application Structure

The template includes a modular app class for easy bot management:

### App Class Usage

```javascript
import app from "./src/app.js";

// Initialize with existing client
const bot = new app({ client: yourClient });

// Initialize with token (creates new client)
const bot = new app({ token: "your_bot_token" });

// Start the bot
await bot.Start();
```

### Automatic Database Initialization

The app class automatically handles database synchronization:

```javascript
async initDatabase() {
  await sequelize.sync();
}
```

This ensures all database tables are created and synchronized when the bot starts.

## 📦 Dependencies

- **discord.js**: Discord API wrapper
- **commandkit**: Command and event handler
- **st.db**: Database management
- **sequelize**: SQL ORM
- **sqlite3**: SQLite database driver
- **zod**: Schema validation

## 🚀 Development

### Development Mode

The template includes nodemon for development:

```bash
npm run dev
```

### File Watching

Nodemon is configured to ignore database files during development to prevent unnecessary restarts.

## 📋 Available Scripts

- `npm start`: Start the bot
- `npm run dev`: Start in development mode with auto-restart
- `npm test`: Run tests (placeholder)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created by [@AboTasneem](https://github.com/AboTasneem)

## 🔗 Links

- [Discord.js Documentation](https://discord.js.org/)
- [CommandKit Documentation](https://commandkit.js.org/)
- [st.db Documentation](https://db.shuruhatik.com/)

---

**Note**: Remember to keep your bot token secure and never commit it to version control!
