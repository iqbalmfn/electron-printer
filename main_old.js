const { app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
  let win = new BrowserWindow({ show: false });

  // URL halaman HTML yang ingin dicetak
  const htmlUrl =
    "http://localhost:8000/print/pdf/antrian/0Ll6oQgpYk9BE7n3wAZb";

  win.loadURL(htmlUrl);

  win.webContents.on("did-finish-load", () => {
    // Print halaman HTML
    win.webContents.print(
      {
        silent: true, // Set to true to print without showing the print dialog
        printBackground: false,
        deviceName: "EPSON TM-T81 Receipt", // Printer name
        margins: {
          marginType: "Format Antrian", // No margin
        },
        pageSize: {
          width: 80 * 1000, // Lebar 80mm
          height: 80 * 1000, // Tinggi 110mm
        },
        scale: 150,
        landscape: false, // Pilih orientasi landscape jika perlu
      },
      (success, failureReason) => {
        if (!success) {
          console.error("Print failed:", failureReason);
        } else {
          console.log("Print succeeded");
          win.close();
        }
      }
    );

    // Optionally, close the window after printing
    // win.close();
  });
});
