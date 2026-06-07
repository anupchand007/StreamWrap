# 🚀 StreamWrap Desktop

StreamWrap is a sleek, completely open-source desktop wrapper designed to free your self-hosted media servers (like Emby, Jellyfin, or Plex) from the limitations of the browser and the paywalls of proprietary native apps!

It works by seamlessly wrapping your media server's web UI into a dedicated, hardware-accelerated Windows application. It completely isolates your viewing experience, eliminates browser clutter, and specifically implements custom fixes for notoriously buggy media-player behaviors on Windows.

## ✨ Why StreamWrap?
- **Universal Compatibility:** Just point it at your server URL, and it instantly wraps it. It remembers your configuration securely via native Windows File Systems (zero heavy third-party databases).
- **Anti-Touch Bug Fixes:** Media servers on Windows laptops frequently misidentify precision touchpads as "Touch Screens", permanently hiding the mouse cursor and locking out UI controls. StreamWrap explicitly disables touch heuristics at the engine level to guarantee flawless mouse operation.
- **Native OSD Injection:** Injects custom keyboard event simulation to guarantee that your media server's On-Screen-Display (OSD) wakes up instantly when your mouse moves. No more vanished volume controls!
- **Zero Overhead:** Extremely minimal boilerplate that doesn't track you, require a subscription, or phone home.

---

## 🛠️ Installation & Build Instructions

If you just want to run the app, download the latest Release and run the `.exe`. 

If you want to build it yourself from the source code, follow these steps:

1. **Prerequisites:** Make sure you have [Node.js](https://nodejs.org/) installed.
2. **Clone the Repository:** 
   ```bash
   git clone https://github.com/YourUsername/StreamWrap-Desktop.git
   cd StreamWrap-Desktop
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Compile for Windows:**
   ```bash
   npm run build
   ```
   *Your shiny new executable will be waiting inside the `dist/StreamWrap-win32-x64/` folder!*

---

## ⚠️ Troubleshooting & FAQ

**Q: The app opens, but I just see a white screen or it fails to load.**
* **Fix:** You likely entered your server URL incorrectly. Open `C:\Users\YourUser\AppData\Roaming\StreamWrap\config.json` in Notepad and delete the file. Launch the app again, and it will prompt you for a fresh URL. Make sure you include the `http://` or `https://` prefix and the correct port (e.g., `http://192.168.1.100:8096`).

**Q: The media controls disappear and my mouse stops working!**
* **Fix:** We already patched this! But if your specific Windows version is still acting up, ensure that you haven't manually enabled touch-screen emulation in your OS settings. StreamWrap forcibly disables touch events to keep the mouse active.

**Q: Can I use a different icon?**
* **Fix:** Yes! Replace `real_icon.png` in the source folder with any 256x256 image you want. You can use an online ICO converter to generate a new `icon.ico` file, drop it in the folder, and run `npm run build` again.

---
*Built with ❤️ for the Self-Hosting Community. MIT Licensed.*
